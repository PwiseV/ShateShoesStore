// src/pages/Customer/Checkout/checkoutTypes.ts
import type { CartItem } from "../Cart/types";

// 1. Coupon (Mã giảm giá)
export type DiscountType = "percentage" | "fixed";

export interface Coupon {
  promotionId: string | number; // Map từ field "id" trong JSON trả về
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number; // Giá trị giảm (10, 20...)
  minOrderValue: number; // Giá trị đơn tối thiểu
  startDate: string;
  endDate: string;
  stock: number; // Map từ "remainingQuantity"
  status?: string;
}

// 2. Address (Địa chỉ)
export interface Address {
  addressId: number;
  street: string;
  ward: string;
  district: string;
  city: string;
  country: string;
  isDefault: boolean;
}

// 3. Order Payload (Gửi lên BE)
export interface OrderItemPayload {
  cartItemId: string;
  variantId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  shippingFee: number;
  total: number;
  name: string;
  phone: string;
  address: string;
  note: string;
  paymentMethod: string;
  promotionId?: string | number | null;
  items: OrderItemPayload[];
}
