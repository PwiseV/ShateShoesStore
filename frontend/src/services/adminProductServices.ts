import api from "./axios";
import type {
  Product,
  ProductQueryParams,
  ProductResponse,
  SizeOption,
  Colors,
} from "../pages/Admin/Products/types";

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
  id: number,
  payload: Omit<Colors, "colorId">
): Promise<Colors> => {
  try {
    const response = await api.post(
      `/admin/products/${id}/variants`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("addSizeColor error:", error);
    throw error;
  }
};

export const updateProductColor = async (
  id: number,
  patch: Partial<Colors>
): Promise<Colors> => {
  try {
    const response = await api.patch(`/admin/products/${id}/variants`, patch);
    return response.data;
  } catch (error) {
    console.error("updateProductColor error:", error);
    throw error;
  }
};

export const deleteProductColor = async (
  id: number,
  payload: { size: string; color: string }
): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/admin/products/${id}/variants`, { data: payload });
    return response.data;
  } catch (error) {
    console.error("deleteProductColor error:", error);
    throw error;
  }
};

export const addProductColor = async (
  id: number,
  payload: { size: string; color: string, price: number; stock: number; avatar: string }
): Promise<{ message: string }> => {
  try {
    const response = await api.post(`/admin/products/${id}/variants`, payload);
    return response.data;
  } catch (error) {
    console.error("addProductColor error:", error);
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

export const getAllCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get("/admin/category");
    return response.data;
  } catch (error) {
    console.error("getAllCategories error:", error);
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
  getAllCategories
};
