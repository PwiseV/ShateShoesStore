import { PayOS } from "@payos/node";

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID || "",
  process.env.PAYOS_API_KEY || "",
  process.env.PAYOS_CHECKSUM_KEY || ""
);

export const createPaymentLink = async (orderData) => {
  try {
    const body = {
      orderCode: Number(orderData.orderCode),
      amount: Number(orderData.amount),
      description: String(orderData.description).substring(0, 25),
      items: orderData.items,
      returnUrl: orderData.returnUrl,
      cancelUrl: orderData.cancelUrl,
    };

    const paymentLink = await payos.paymentRequests.create(body);
    
    return paymentLink;
  } catch (error) {
    console.error("PayOS Service Error:", error.message);
    throw new Error(error.message);
  }
};

export const getPaymentDetail = async (orderCode) => {
  return await payos.paymentRequests.get(orderCode);
};