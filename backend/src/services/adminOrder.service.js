import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import ProductVariant from "../models/ProductVariant.js";
import mongoose from "mongoose";

// 1. Lấy danh sách kèm phân trang & lọc
export const getAllOrders = async (query) => {
  const { page = 1, pageSize = 10, keyword, status, paymentMethod, minPrice, maxPrice } = query;
  let filter = {};

  if (keyword) {
    filter.$or = [
      { orderNumber: { $regex: keyword, $options: "i" } },
      { name: { $regex: keyword, $options: "i" } }
    ];
  }

  if (status && status !== "Tất cả") filter.status = status;
  if (paymentMethod && paymentMethod !== "Tất cả") filter.paymentMethod = paymentMethod;

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.total = {};
    if (minPrice) filter.total.$gte = Number(minPrice);
    if (maxPrice) filter.total.$lte = Number(maxPrice);
  }

  const total = await Order.countDocuments(filter);
  const data = await Order.find(filter)
    .populate("userId", "email")
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(pageSize))
    .limit(Number(pageSize));

  // Map lại cho khớp Interface OrderData của FE
  const mappedData = data.map(order => ({
    ...order.toJSON(),
    id: order._id,
    email: order.userId?.email || "N/A"
  }));

  return { data: mappedData, total, page: Number(page), pageSize: Number(pageSize) };
};

// 2. Lấy chi tiết sâu (Để hiện danh sách sản phẩm ở Hình 2, 4)
export const getOrderDetail = async (id) => {
  const order = await Order.findById(id).populate("userId", "email displayName");
  if (!order) throw new Error("ORDER_NOT_FOUND");

  const orderItems = await OrderItem.find({ orderId: id }).populate({
    path: "variantId",
    populate: { path: "productId", select: "title" }
  });

  return {
    ...order.toJSON(),
    id: order._id,
    email: order.userId?.email || "N/A",
    displayName: order.userId?.displayName || "N/A",
    // Map lại để FE chỉ việc in ra, không cần tính toán gì thêm
    items: orderItems.map(item => ({
      id: item._id,
      productName: `${item.variantId?.productId?.title || "Sản phẩm"}`,
      variantInfo: `${item.variantId?.color || ""} - Size: ${item.variantId?.size || ""}`,
      sku: item.variantId?.sku || "N/A",
      quantity: item.quantity || 0,
      price: item.price || 0,
      total: (item.quantity || 0) * (item.price || 0) // Tính sẵn ở BE
    }))
  };
};

// 3. Cập nhật Đơn hàng (Xử lý cả thông tin khách và Sản phẩm - Hình 3, 6)
export const updateOrderAdmin = async (id, payload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, phone, address, status, items, note } = payload;
    const order = await Order.findById(id);
    if (!order) throw new Error("ORDER_NOT_FOUND");

    // A. Cập nhật thông tin cơ bản
    order.name = name || order.name;
    order.phone = phone || order.phone;
    order.address = address || order.address;
    order.note = note || order.note;

    if (status && status !== order.status) {
      order.status = status;
      if (status === "shipped") order.shippedAt = Date.now();
      if (status === "delivered") order.deliveredAt = Date.now();
    }

    // B. Nếu có sửa danh sách sản phẩm (Xóa/Sửa số lượng - Hình 6)
    if (items) {
      // 1. Hoàn lại kho cho các item cũ trước khi xóa
      const oldItems = await OrderItem.find({ orderId: id });
      for (const oldItem of oldItems) {
        await ProductVariant.findByIdAndUpdate(oldItem.variantId, { $inc: { stock: oldItem.quantity } }, { session });
      }
      await OrderItem.deleteMany({ orderId: id }).session(session);

      // 2. Thêm item mới & Trừ kho & Tính lại tổng tiền
      let newTotal = 0;
      for (const item of items) {
        const variant = await ProductVariant.findById(item.variantId || item.sku); // Tuỳ FE gửi gì
        if (!variant) throw new Error("VARIANT_NOT_FOUND");
        
        await OrderItem.create([{
          orderId: id,
          variantId: variant._id,
          quantity: item.quantity,
          price: item.price || variant.price
        }], { session });

        newTotal += (item.price || variant.price) * item.quantity;
        await ProductVariant.findByIdAndUpdate(variant._id, { $inc: { stock: -item.quantity } }, { session });
      }
      order.total = newTotal;
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

// 4. Xóa đơn hàng
export const deleteOrder = async (id) => {
  const orderItems = await OrderItem.find({ orderId: id });
  // Hoàn kho
  for (const item of orderItems) {
    await ProductVariant.findByIdAndUpdate(item.variantId, { $inc: { stock: item.quantity } });
  }
  await OrderItem.deleteMany({ orderId: id });
  return await Order.findByIdAndDelete(id);
};


// Tạm thêm để bơm data: 
export const createOrder = async (payload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, name, phone, address, paymentMethod, items, note } = payload;

    // 1. Tạo mã đơn hàng duy nhất
    const orderNumber = `ORD-${Date.now()}`;

    // 2. Tính toán tổng tiền và kiểm tra kho từ ProductVariant
    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      const variant = await ProductVariant.findById(item.variantId);
      if (!variant) throw new Error(`Không tìm thấy sản phẩm với ID: ${item.variantId}`);
      if (variant.stock < item.quantity) throw new Error(`Sản phẩm ${variant.sku} không đủ tồn kho`);

      const itemTotal = variant.price * item.quantity;
      total += itemTotal;

      orderItemsData.push({
        variantId: variant._id,
        quantity: item.quantity,
        price: variant.price, // Lưu giá tại thời điểm mua
      });

      // 3. Trừ kho sản phẩm
      variant.stock -= item.quantity;
      await variant.save({ session });
    }

    // 4. Tạo bản ghi Order
    const [newOrder] = await Order.create([{
      orderNumber,
      userId,
      name,
      phone,
      address,
      paymentMethod: paymentMethod || "COD",
      total,
      note,
      status: "pending" // Trạng thái mặc định khi tạo
    }], { session });

    // 5. Tạo các bản ghi OrderItem
    const finalOrderItems = orderItemsData.map(item => ({
      ...item,
      orderId: newOrder._id
    }));
    await OrderItem.insertMany(finalOrderItems, { session });

    await session.commitTransaction();
    return newOrder;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};