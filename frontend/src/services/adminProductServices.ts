import api from "./axios";

export type Colors = {
  colorId: number;
  color: string;
  price: number;
  stock: number;
  avatar: string;
};

export type SizeOption = {
  sizeID: number;
  size: string;
  colors: Colors[];
};

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

// ===== PRODUCT ENDPOINTS =====

export const getProducts = async (
  params: ProductQueryParams
): Promise<ProductResponse> => {
  try {
    const response = await api.get("/admin/products", { params });
    return response.data;
  } catch (error) {
    console.error("getProducts error:", error);
    throw error;
  }
};

export const createProduct = async (
  payload: Omit<Product, "id">
): Promise<Product> => {
  try {
    const response = await api.post("/admin/products", payload);
    return response.data;
  } catch (error) {
    console.error("createProduct error:", error);
    throw error;
  }
};

export const updateProduct = async (
  id: number,
  patch: Partial<Product>
): Promise<Product> => {
  try {
    const response = await api.patch(`/admin/products/${id}`, patch);
    return response.data;
  } catch (error) {
    console.error("updateProduct error:", error);
    throw error;
  }
};

export const deleteProduct = async (
  id: number
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("deleteProduct error:", error);
    throw error;
  }
};

// ===== PRODUCT SIZES ENDPOINTS =====

export const getProductSizes = async (
  productId: number
): Promise<SizeOption[]> => {
  try {
    const response = await api.get(`/admin/products/${productId}/sizes`);
    return response.data;
  } catch (error) {
    console.error("getProductSizes error:", error);
    throw error;
  }
};

export const addProductSize = async (
  productId: number,
  payload: Omit<SizeOption, "sizeID">
): Promise<SizeOption> => {
  try {
    const response = await api.post(
      `/admin/products/${productId}/sizes`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("addProductSize error:", error);
    throw error;
  }
};

export const deleteProductSize = async (
  sizeId: number
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/admin/product-sizes/${sizeId}`);
    return response.data;
  } catch (error) {
    console.error("deleteProductSize error:", error);
    throw error;
  }
};

// ===== PRODUCT COLORS ENDPOINTS =====

export const getSizeColors = async (sizeId: number): Promise<Colors[]> => {
  try {
    const response = await api.get(`/admin/product-sizes/${sizeId}/colors`);
    return response.data;
  } catch (error) {
    console.error("getSizeColors error:", error);
    throw error;
  }
};

export const addSizeColor = async (
  sizeId: number,
  payload: Omit<Colors, "colorId">
): Promise<Colors> => {
  try {
    const response = await api.post(
      `/admin/product-sizes/${sizeId}/colors`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("addSizeColor error:", error);
    throw error;
  }
};

export const updateProductColor = async (
  colorId: number,
  patch: Partial<Colors>
): Promise<Colors> => {
  try {
    const response = await api.put(`/admin/product-colors/${colorId}`, patch);
    return response.data;
  } catch (error) {
    console.error("updateProductColor error:", error);
    throw error;
  }
};

export const deleteProductColor = async (
  colorId: number
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/admin/product-colors/${colorId}`);
    return response.data;
  } catch (error) {
    console.error("deleteProductColor error:", error);
    throw error;
  }
};

export const adjustStock = async (
  colorId: number,
  newStock: number
): Promise<Colors> => {
  try {
    return await updateProductColor(colorId, { stock: newStock });
  } catch (error) {
    console.error("adjustStock error:", error);
    throw error;
  }
};

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductSizes,
  addProductSize,
  deleteProductSize,
  getSizeColors,
  addSizeColor,
  updateProductColor,
  deleteProductColor,
  adjustStock,
};
