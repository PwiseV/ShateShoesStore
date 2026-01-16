import type { Product } from "../../../services/productListServices";
import type { Colors } from "../../Admin/Products/types";

export interface CartItem {
  product: Product;
  size: string;
  color: Colors;
  quantity: number;
  id: string | number;
}