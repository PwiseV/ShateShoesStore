// --- DOMAIN TYPES (Chuyển từ adminProductServices sang đây) ---

export type Colors = {
  colorId: number;
  color: string;
  price: number;
  stock: number;
  avatar: string;
};

export interface SizeOption {
  sizeID: number;
  size: string;
  colors: Colors[];
}

export type Product = {
  id: number;
  productId: string;
  description: string;
  avatar: string;
  title: string;
  category: string;
  sizes: SizeOption[];
  tags?: string[];
};

export interface ProductQueryParams {
  page: number;
  pageSize: number;
  keyword?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductResponse {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
}

// --- FORM TYPES ---

export interface ProductFormData {
  productId: string;
  title: string;
  category: string;
  description: string;
  avatar: string;
  tags: string[];
}

export interface NewColorInput {
  color: string;
  price: string | number; // Cho phép nhập chuỗi từ input, sau đó convert sang number
  stock: string | number;
  avatar: string;
}
