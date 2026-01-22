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

// --- UPDATE HÀM VALIDATE ---
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

    // SỬA LẠI CHỖ NÀY: Truy cập vào res.data.data
    // res.data là toàn bộ response body ({ success: true, data: {...} })
    // res.data.data mới là object chứa thông tin coupon
    const data = res.data.data;

    // Nếu API trả về thành công nhưng data rỗng -> Coi như không tồn tại
    if (!data) {
      throw new Error("Mã giảm giá không tồn tại!");
    }

    // 2. Chuẩn bị dữ liệu để kiểm tra
    const now = new Date();
    const startDate = new Date(data.startedAt);
    const endDate = new Date(data.expiredAt);
    const minOrderAmount = data.minOrderAmount || data.minOrderValue || 0;
    const stock = data.stock; // Không cần || 0 ở đây vội để debug, nhưng API trả về 10 là ok
    const status = data.active;

    // 3. --- BẮT ĐẦU KIỂM TRA LOGIC (Frontend Validation) ---

    // 3.1 Kiểm tra Status
    if (status === "inactive") {
      throw new Error("Mã giảm giá đang bị khóa!");
    }
    // Một số API trả về status expired luôn thay vì check ngày
    if (status === "expired") {
      throw new Error("Mã giảm giá đã hết hạn!");
    }

    // 3.2 Kiểm tra Ngày hiệu lực (Start Date)
    if (now < startDate) {
      throw new Error("Mã giảm giá chưa đến đợt áp dụng!");
    }

    // 3.3 Kiểm tra Ngày hết hạn (End Date)
    if (now > endDate) {
      throw new Error("Mã giảm giá đã hết hạn sử dụng!");
    }

    // 3.4 Kiểm tra Số lượng (Stock)
    // Lưu ý: data.stock = 10, check 10 <= 0 -> False (Hợp lệ)
    if (stock !== undefined && stock <= 0) {
      throw new Error("Mã giảm giá đã hết lượt sử dụng!");
    }

    // 3.5 Kiểm tra Giá trị đơn hàng tối thiểu
    if (total < minOrderAmount) {
      const formattedMin = minOrderAmount.toLocaleString("vi-VN");
      throw new Error(
        `Đơn hàng cần tối thiểu ${formattedMin}đ để dùng mã này!`
      );
    }

    // --- KẾT THÚC KIỂM TRA ---

    // 4. Trả về kết quả
    return {
      promotionId: data.promotionId,
      code: data.code,
      description: data.description,
      discountType: data.discountType,
      discountValue: data.discountAmount || data.discountValue || 0,
      minOrderValue: minOrderAmount,
      stock: stock || 0,
      startDate: data.startedAt,
      endDate: data.expiredAt,
      status: status,
    };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Lỗi kiểm tra mã giảm giá";
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
