import api from "./axios";

export interface CreatePaymentLinkPayload {
  amount: number;
  items: { name: string; quantity: number; price: number }[];
  description?: string;
}

export interface PaymentResponse {
  message: string;
  data: {
    bin: string;
    checkoutUrl: string;
    accountNumber: string;
    accountName: string;
    amount: number;
    description: string;
    orderCode: number;
    qrCode: string;
  };
}

export const createPaymentLink = async (
  payload: CreatePaymentLinkPayload
): Promise<PaymentResponse> => {
  try {
    const response = await api.post("/users/payos/create-link", payload);
    return response.data;
  } catch (error) {
    console.error("createPaymentLink error:", error);
    throw error;
  }
};


export const getPaymentStatus = async (orderCode: string | number): Promise<any> => {
  try {
    const response = await api.get(`/users/payos/order/${orderCode}`);
    return response.data;
  } catch (error) {
    console.error("getPaymentStatus error:", error);
    throw error;
  }
};

export default {
  createPaymentLink,
  getPaymentStatus,
};