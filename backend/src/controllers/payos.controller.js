import * as payosService from "../services/payos.service.js";

export const createLink = async (req, res) => {
  try {
    const { amount, items } = req.body;
    const orderCode = Date.now();

    const orderData = {
      orderCode,
      amount,
      description: `Thanh toan don #${orderCode}`,
      items,
      returnUrl: `${process.env.FRONTEND_URL}/payment-success`,
      cancelUrl: `${process.env.FRONTEND_URL}/payment-failed`,
    };

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
