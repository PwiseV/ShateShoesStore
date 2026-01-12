import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import ProductColorVariant from "../models/ProductColorVariant.js";

// --- 1. LẤY DANH SÁCH ĐƠN HÀNG (Cho Ảnh 1 & 4) ---
export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword, status, paymentMethod, minPrice, maxPrice } = req.query;

    let query = {};

    // Tìm theo mã đơn hoặc tên khách hàng
    if (keyword) {
      query.$or = [
        { orderNumber: { $regex: keyword, $options: "i" } },
        { name: { $regex: keyword, $options: "i" } }
      ];
    }

    if (status) query.status = status;
    if (paymentMethod) query.paymentMethod = paymentMethod;
    
    // Lọc theo khoảng giá
    if (minPrice || maxPrice) {
      query.total = {};
      if (minPrice) query.total.$gte = Number(minPrice);
      if (maxPrice) query.total.$lte = Number(maxPrice);
    }

    const totalOrders = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(pageSize))
      .limit(Number(pageSize));

    res.status(200).json({
      data: orders,
      total: totalOrders,
      page: Number(page),
      pageSize: Number(pageSize)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 2. XEM CHI TIẾT ĐƠN HÀNG (Cho Ảnh 2) ---
export const getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("userId", "name email");
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    // Lấy các item và populate sâu để lấy tên giày, size, màu
    const items = await OrderItem.find({ orderId: id }).populate({
      path: "colorId",
      populate: {
        path: "sizeId",
        populate: {
          path: "productId",
          select: "title" // Chỉ lấy tên giày cho nhẹ
        }
      }
    });

    res.status(200).json({ order, items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 3. CẬP NHẬT THÔNG TIN ĐƠN HÀNG (Cho Ảnh 3) ---
export const updateOrderAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address, status, note } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Đơn hàng không tồn tại" });

    // Cập nhật các trường cho phép
    if (name) order.name = name;
    if (phone) order.phone = phone;
    if (address) order.address = address;
    if (note) order.note = note;
    
    // Xử lý logic chuyển trạng thái để lưu ngày tương ứng
    if (status && status !== order.status) {
      order.status = status;
      if (status === "shipped") order.shippedAt = Date.now();
      if (status === "delivered") order.deliveredAt = Date.now();
      if (status === "paid") order.paidAt = Date.now();
    }

    await order.save();
    res.status(200).json({ message: "Cập nhật đơn hàng thành công", data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 4. XÓA ĐƠN HÀNG (VÀ HOÀN LẠI KHO) ---
export const deleteOrderAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItems = await OrderItem.find({ orderId: id });

    // Hoàn lại số lượng vào kho cho từng sản phẩm trong đơn
    for (const item of orderItems) {
      await ProductColorVariant.findByIdAndUpdate(item.colorId, {
        $inc: { stock: item.quantity }
      });
    }

    // Xóa item và xóa đơn
    await OrderItem.deleteMany({ orderId: id });
    await Order.findByIdAndDelete(id);

    res.status(200).json({ message: "Đã xóa đơn hàng và hoàn trả số lượng vào kho" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};