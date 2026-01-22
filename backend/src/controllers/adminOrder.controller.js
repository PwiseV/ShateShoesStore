import * as adminOrderService from "../services/adminOrder.service.js";

/**
 * GET /orders
 * Danh sách đơn hàng (admin)
 */
export const getAllOrders = async (req, res) => {
  try {
    const result = await adminOrderService.getAllOrders(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /orders/:id
 * Chi tiết đơn hàng
 */
export const getOrderDetail = async (req, res) => {
  try {
    const order = await adminOrderService.getOrderDetail(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * PATCH /orders/:id
 * Cập nhật đơn hàng (status / info)
 */
export const updateOrderAdmin = async (req, res) => {
  try {
    const updated = await adminOrderService.updateOrderAdmin(
      req.params.id,
      req.body
    );
    res.status(200).json({
      message: "Cập nhật đơn hàng thành công",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * POST /orders
 * Tạo đơn hàng (tạm để seed data)
 */
export const createOrder = async (req, res) => {
  try {
    const result = await adminOrderService.createOrder(req.user._id, req.body);
    res.status(201).json({
      message: "Tạo đơn hàng thành công",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
