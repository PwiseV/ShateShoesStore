import api from "./axios";
import type {
  Product,
  ProductQueryParams,
  ProductResponse,
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
  updateProductColor,
  deleteProductColor,
  getAllCategories
};
