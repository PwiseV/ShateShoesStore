import * as adminOrderService from "../services/adminOrder.service.js";

export const getAllOrders = async (req, res) => {
  try {
    const result = await adminOrderService.getAllOrders(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderDetail = async (req, res) => {
  try {
    const result = await adminOrderService.getOrderDetail(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "Không tìm thấy đơn hàng" });
  }
};

export const updateOrderAdmin = async (req, res) => {
  try {
    const result = await adminOrderService.updateOrderAdmin(req.params.id, req.body);
    res.status(200).json({ message: "Cập nhật thành công", data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOrderAdmin = async (req, res) => {
  try {
    await adminOrderService.deleteOrder(req.params.id);
    res.status(200).json({ message: "Đã xóa và hoàn kho thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// thêm tạm: 
export const createOrder = async (req, res) => {
  try {
    // Nếu là Admin tạo hộ khách, userId có thể lấy từ body
    // Nếu là Khách tự đặt, userId lấy từ req.user._id
    const payload = {
      ...req.body,
      userId: req.body.userId || req.user?._id 
    };

    const result = await adminOrderService.createOrder(payload);
    res.status(201).json({ message: "Tạo đơn hàng thành công", data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};