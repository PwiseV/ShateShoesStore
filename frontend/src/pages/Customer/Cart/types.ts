import type {
  Product as BaseProduct,
  BackendColorVariant,
} from "../../../services/productdetailsServices";

export type CartColor = BackendColorVariant;
export type Product = BaseProduct;

export interface CartItem {
  product: Product;
  size: string;
  color: CartColor;
  quantity: number;
  id: string | number;
  selected?: boolean;
}

// --- MỚI: Promotion Type chuẩn ---
export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT";
export type PromotionStatus = "ACTIVE" | "INACTIVE" | "EXPIRED";

export interface Promotion {
  id: number | string;
  code: string;
  description: string;
  discountType: DiscountType;
  discountAmount: number;
  minOrderAmount: number;
  startDate: string; // ISO Date String
  endDate: string; // ISO Date String
  totalQuantity: number;
  status: PromotionStatus;
}
