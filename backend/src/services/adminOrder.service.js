import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import ProductVariant from "../models/ProductVariant.js";
import mongoose from "mongoose";

/**
 * Thứ tự hợp lệ của status (chỉ được tiến)
 */
const STATUS_FLOW = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
];

/**
 * Validate status transition
 */
const canMoveStatus = (current, next) => {
  if (next === "cancelled") {
    return ["pending", "processing"].includes(current);
  }
  return STATUS_FLOW.indexOf(next) > STATUS_FLOW.indexOf(current);
};

/**
 * Get admin orders with filter and pagination
 */
export const getAllOrders = async (query) => {
  const {
    page = 1,
    limit = 10,
    status,
    paymentMethod,
    minTotal,
    maxTotal,
  } = query;

  const filter = {};

  if (status) filter.status = status;
  if (paymentMethod) filter.paymentMethod = paymentMethod;

  if (minTotal || maxTotal) {
    filter.total = {};
    if (minTotal) filter.total.$gte = Number(minTotal);
    if (maxTotal) filter.total.$lte = Number(maxTotal);
  }

  const totalItems = await Order.countDocuments(filter);

  const orders = await Order.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .select("orderNumber name phone total paymentMethod status createdAt");

  return {
    data: orders,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};

/**
 * GET /admin/orders/:id
 * Chi tiết đơn hàng
 */

export const getOrderDetail = async (id) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Không tìm thấy đơn hàng");

  const items = await OrderItem.find({ orderId: id }).populate({
    path: "variantId",
    populate: {
      path: "productId",
      select: "title avatar",
    },
  });

  return {
    ...order.toJSON(),
    items: items.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity,
      variant: {
        _id: item.variantId?._id,
        size: item.variantId?.size,
        color: item.variantId?.color,
      },
      product: {
        _id: item.variantId?.productId?._id,
        title: item.variantId?.productId?.title,
        image: item.variantId?.productId?.avatar?.url,
      },
    })),
  };
};

/**
 * PATCH /admin/orders/:id
 * Cập nhật đơn hàng (status / info)
 */
export const updateOrderAdmin = async (id, payload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(id).session(session);
    if (!order) throw new Error("Không tìm thấy đơn hàng");

    if (order.status === "cancelled") {
      throw new Error("Đơn hàng đã hủy, không thể chỉnh sửa");
    }

    const { status, name, phone, address, paymentMethod } = payload;

    // Update basic info
    if (name) order.name = name;
    if (phone) order.phone = phone;
    if (address) order.address = address;
    if (paymentMethod) order.paymentMethod = paymentMethod;

    // Update status
    if (status && status !== order.status) {
      if (!canMoveStatus(order.status, status)) {
        throw new Error("Không thể cập nhật trạng thái không hợp lệ");
      }

      // Huỷ đơn → rollback stock
      if (status === "cancelled") {
        const items = await OrderItem.find({ orderId: id }).session(session);
        for (const item of items) {
          await ProductVariant.findByIdAndUpdate(
            item.variantId,
            { $inc: { stock: item.quantity } },
            { session }
          );
        }
      }

      order.status = status;
      if (status === "shipped") order.shippedAt = new Date();
      if (status === "delivered") order.deliveredAt = new Date();
    }

    await order.save({ session });
    await session.commitTransaction();
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


export const createOrder = async (payload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, name, phone, address, paymentMethod, items, note } = payload;

    if (!items || items.length === 0) {
      throw new Error("Đơn hàng phải có ít nhất 1 sản phẩm");
    }

    let total = 0;
    const orderItemsData = [];

    // 1️ Kiểm tra variant + trừ kho + tính tiền
    for (const item of items) {
      const variant = await ProductVariant.findById(item.variantId).session(session);
      if (!variant) throw new Error("Không tìm thấy product variant");

      if (variant.stock < item.quantity) {
        throw new Error(`Không đủ tồn kho cho SKU ${variant.sku}`);
      }

      const price = variant.price;
      total += price * item.quantity;

      orderItemsData.push({
        variantId: variant._id,
        quantity: item.quantity,
        price,
      });

      // Trừ kho
      variant.stock -= item.quantity;
      await variant.save({ session });
    }

    // 2️ Tạo Order
    const [order] = await Order.create(
      [
        {
          orderNumber: `ORD-${Date.now()}`,
          userId,
          name,
          phone,
          address,
          paymentMethod: paymentMethod || "COD",
          total,
          note,
          status: "pending",
        },
      ],
      { session }
    );

    // 3️ Tạo OrderItems
    const finalItems = orderItemsData.map((item) => ({
      ...item,
      orderId: order._id,
    }));

    await OrderItem.insertMany(finalItems, { session });

    await session.commitTransaction();
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
