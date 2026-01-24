// --- DOMAIN TYPES (Chuyển từ adminProductServices sang đây) ---

export type Colors = {
  color: string;
  price: number;
  stock: number;
  avatar: string;
};

export interface SizeOption {
  size: string;
  colors: Colors[];
}

export type Product = {
  productId: number;
  code: string;
  description: string;
  avatar: string;
  title: string;
  category: {
    categoryId: string;
    name: string;
    slug: string;
    parent: {
      categoryId: string;
      name: string;
      slug: string;
    };
  };
  tag?: string[];
};

export interface ProductQueryParams {
  page: number;
  limit: number;
  keyword?: string;
  category?: string;
}

export interface ProductResponse {
  data: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// --- FORM TYPES ---

export interface ProductFormData {
  code: string;
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
