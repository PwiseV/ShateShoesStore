// src/services/checkoutService.ts
import api from "./axios";
import type {
  Address,
  Coupon,
  CreateOrderPayload,
} from "../pages/Customer/Checkout/types";

// 1. Address
export const getUserAddresses = async (): Promise<Address[]> => {
  const res = await api.get("/users/addresses");
  return res.data.data || res.data;
};

// 1.2 Thêm địa chỉ mới (POST)
// URL: /users/addresses
// Body: street, ward, district, city, country, isDefault
export const createUserAddress = async (
  payload: Omit<Address, "addressId">
) => {
  const res = await api.post("/users/addresses", payload);
  return res.data;
};

// 1.3 Cập nhật địa chỉ (PATCH)
// URL: /users/addresses/:addressId
// Params: addressId
// Body: street, ward, district, city, country, isDefault
export const updateUserAddress = async (
  addressId: number,
  payload: Omit<Address, "addressId">
) => {
  const res = await api.patch(`/users/addresses/${addressId}`, payload);
  return res.data;
};

// 2. Coupons

// 1.1 Lấy danh sách coupon khả dụng (GET)
export const getAvailableCoupons = async (total: number): Promise<Coupon[]> => {
  // Khi dùng params, axios sẽ gửi request dạng: /users/promotions/coupon?total=500000
  const res = await api.get("/users/promotions/coupon", {
    params: {
      total: total,
    },
  });

  const rawData = res.data.data || [];

  return rawData.map((item: any) => ({
    promotionId: item.id || item.promotionId,
    code: item.code,
    description: item.description,
    discountType: item.discountType,
    discountValue: item.discountValue,
    minOrderValue: item.minOrderValue,
    startDate: item.startDate,
    endDate: item.endDate,
    stock: item.remainingQuantity || item.stock,
  }));
};

// 1.2 Kiểm tra mã user nhập (POST)
// Logic này giữ nguyên vì POST mặc định gửi body
export const validateCoupon = async (
  code: string,
  total: number
): Promise<Coupon> => {
  try {
    const res = await api.post("/users/promotions/coupon", {
      codeString: code, // Lưu ý tên field là codeString theo document
      total: total,
    });

    const data = res.data;

    return {
      promotionId: data.promotionId,
      code: data.code,
      description: data.description,
      discountType: data.discountType,
      discountValue: data.discountAmount, // POST trả về discountAmount
      minOrderValue: data.minOrderAmount, // POST trả về minOrderAmount
      startDate: data.startedAt,
      endDate: data.expiredAt,
      stock: data.stock,
    };
  } catch (error: any) {
    throw error;
  }
};

// 3. Place Order
export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await api.post("/users/orders", payload);
  return res.data;
};

export default {
  getUserAddresses,
  getAvailableCoupons,
  validateCoupon,
  createOrder,
};
