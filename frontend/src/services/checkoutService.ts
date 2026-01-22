// src/services/checkoutService.ts
import api from "./axios";
import type {
  Address,
  Coupon,
  CreateOrderPayload,
} from "../pages/Customer/Checkout/types";

// ... (Giữ nguyên các hàm Address, CreateOrder, getAvailableCoupons) ...

// 1. Address (Giữ nguyên)
export const getUserAddresses = async (): Promise<Address[]> => {
  const res = await api.get("/users/addresses");
  return res.data.data || res.data;
};

export const createUserAddress = async (
  payload: Omit<Address, "addressId">
) => {
  const res = await api.post("/users/addresses", payload);
  return res.data;
};

export const updateUserAddress = async (
  addressId: number,
  payload: Omit<Address, "addressId">
) => {
  const res = await api.patch(`/users/addresses/${addressId}`, payload);
  return res.data;
};

export const getAvailableCoupons = async (total: number): Promise<Coupon[]> => {
  const res = await api.get("/users/promotions/coupon", {
    params: { total },
  });
  const rawData = res.data.data || [];
  return rawData.map((item: any) => ({
    promotionId: item.id || item.promotionId,
    code: item.code,
    description: item.description,
    discountType: item.discountType,
    discountValue: item.discountValue || item.discountAmount || 0,
    minOrderValue: item.minOrderValue || item.minOrderAmount || 0,
    stock: item.remainingQuantity || item.stock || 0,
    startDate: item.startDate || item.startedAt,
    endDate: item.endDate || item.expiredAt,
    status: item.active || item.status, // Mapping thêm status để hiển thị nếu cần
  }));
};

// --- PHẦN QUAN TRỌNG: LOGIC VALIDATE TẠI FRONTEND ---
export const validateCoupon = async (
  code: string,
  total: number
): Promise<Coupon> => {
  try {
    // 1. Gọi API lấy thông tin Coupon
    const res = await api.post("/users/promotions/coupon", {
      codeString: code,
      total: total,
    });

    const data = res.data;

    // Nếu API trả về thành công nhưng data rỗng -> Coi như không tồn tại
    if (!data) {
      throw new Error("Mã giảm giá không tồn tại!");
    }

    // 2. Chuẩn bị dữ liệu để kiểm tra
    const now = new Date();
    const startDate = new Date(data.startedAt);
    const endDate = new Date(data.expiredAt);
    const minOrderAmount = data.minOrderAmount || data.minOrderValue || 0;
    const stock = data.stock || 0;
    const status = data.active; // active | inactive | expired | upcoming

    // 3. --- BẮT ĐẦU KIỂM TRA LOGIC (Frontend Validation) ---

    // 3.1 Kiểm tra Status từ Enum BE
    if (status === "inactive") {
      throw new Error("Mã giảm giá đang bị khóa!");
    }
    if (status === "expired") {
      throw new Error("Mã giảm giá đã hết hạn!");
    }

    // 3.2 Kiểm tra Ngày hiệu lực (Start Date)
    if (now < startDate) {
      throw new Error("Mã giảm giá chưa đến đợt áp dụng!");
    }

    // 3.3 Kiểm tra Ngày hết hạn (End Date) - Kiểm tra lại cho chắc dù status có thể chưa cập nhật
    if (now > endDate) {
      throw new Error("Mã giảm giá đã hết hạn sử dụng!");
    }

    // 3.4 Kiểm tra Số lượng (Stock)
    if (stock <= 0) {
      throw new Error("Mã giảm giá đã hết lượt sử dụng!");
    }

    // 3.5 Kiểm tra Giá trị đơn hàng tối thiểu
    if (total < minOrderAmount) {
      // Format tiền tệ cho đẹp: 500000 -> 500.000
      const formattedMin = minOrderAmount.toLocaleString("vi-VN");
      throw new Error(
        `Đơn hàng cần tối thiểu ${formattedMin}đ để dùng mã này!`
      );
    }

    // --- KẾT THÚC KIỂM TRA ---

    // 4. Nếu thỏa mãn tất cả, trả về đối tượng Coupon chuẩn
    return {
      promotionId: data.promotionId,
      code: data.code,
      description: data.description,
      discountType: data.discountType,
      // Map đúng tên field FE cần
      discountValue: data.discountAmount || data.discountValue || 0,
      minOrderValue: minOrderAmount,
      stock: stock,
      startDate: data.startedAt,
      endDate: data.expiredAt,
      status: status,
    };
  } catch (error: any) {
    // Nếu là lỗi do mình throw ở trên (Error), lấy message ra
    // Nếu là lỗi từ API (AxiosError), lấy response message
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Lỗi kiểm tra mã giảm giá";

    // Ném lỗi tiếp ra ngoài để useCheckout bắt được và showToast
    throw new Error(errorMessage);
  }
};

// ... (Giữ nguyên createOrder) ...
export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await api.post("/users/orders", payload);
  return res.data;
};

export default {
  getUserAddresses,
  createUserAddress,
  updateUserAddress,
  getAvailableCoupons,
  validateCoupon,
  createOrder,
};
