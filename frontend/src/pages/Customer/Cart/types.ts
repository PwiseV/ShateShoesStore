import type {
  Product as BaseProduct,
  BackendColorVariant,
} from "../../../services/productdetailsServices";

// --- START: Cấu trúc dữ liệu khớp với API BE ---

// 1. Cấu trúc Product nằm trong CartItem
export interface BackendCartVariant {
  variantId: string;
  color: string;
  price: number;
  avatar: string;
  stock: number;
}

export interface BackendCartSize {
  size: string;
  colors: BackendCartVariant[];
}

export interface CartProduct {
  productId: string;
  code: string;
  title: string;
  description: string;
  avatar: string;
  sizes: BackendCartSize[];
}

// 2. Cấu trúc CartItem trả về từ API GET users/cart
export interface CartItem {
  cartItemId: string; // ID duy nhất của dòng giỏ hàng (để xóa/sửa)
  variantId: string; // ID biến thể hiện tại
  quantity: number;
  size: string;
  color: string;
  price: number;
  stock: number;
  avatar: string;
  isOutOfStock: boolean;
  isAdjust: boolean; // True nếu quantity > stock -> FE cần cảnh báo
  product: CartProduct;
  selected?: boolean; // FE state (để chọn thanh toán)
}

// Type cho payload update (PATCH)
export interface UpdateCartPayload {
  quantity: number;
  variantId: string;
}

// Giữ lại alias nếu cần dùng ở nơi khác, nhưng CartItem giờ dùng cấu trúc trên
export type CartColor = BackendCartVariant;
export type Product = CartProduct;
