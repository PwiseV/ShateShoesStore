import * as payosService from "../services/payos.service.js";

export const createLink = async (req, res) => {
  try {
    const { amount, items } = req.body;
    const orderCode = Date.now();

    // --- SỬA ĐOẠN NÀY ---
    // Nếu chưa cấu hình env thì lấy mặc định localhost:5173
    const domain = process.env.FRONTEND_URL || "http://localhost:5173";

    const orderData = {
      orderCode,
      amount,
      description: `Thanh toan don #${orderCode}`,
      items,
      returnUrl: `${domain}/order-success`, // Đảm bảo khớp với route ở Frontend
      cancelUrl: `${domain}/payment-failed`, // Hoặc quay lại trang cart
    };
    // --------------------

    const result = await payosService.createPaymentLink(orderData);

    return res.status(200).json({
      message: "Tạo link thanh toán thành công",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const webhook = async (req, res) => {
  try {
    console.log("Webhook nhận dữ liệu:", req.body);
    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
