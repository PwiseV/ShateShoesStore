// 1. Import các type có sẵn từ dự án của bạn
import type { Product as BaseProduct } from "../../../services/productListServices";
import type { Colors as BaseColors } from "../../Admin/Products/types";

// 2. Mở rộng Type Colors cho logic Cart
// Cart cần thêm price, stock và avatar riêng cho từng biến thể màu
export type CartColor = BaseColors & {
  price: number;
  stock: number;
  avatar: string;
};

// 3. Định nghĩa cấu trúc SizeOption để render Dropdown
export interface SizeOption {
  size: string;
  colors: CartColor[];
}

// 4. Mở rộng Type Product gốc
// Thêm trường sizeOptions vào Product để Cart biết cách hiển thị dropdown
export type Product = BaseProduct & {
  sizeOptions?: SizeOption[];
  // Lưu ý: Đảm bảo BaseProduct của bạn có trường 'title' và 'avatar'.
  // Nếu bên đó dùng 'name' hay 'image', bạn cần mapping lại trong fakeData hoặc sửa component.
};

// 5. Type chính cho Item trong Giỏ hàng
export interface CartItem {
  product: Product;
  size: string;
  color: CartColor;
  quantity: number;
  id: string | number;
  selected?: boolean;
}
