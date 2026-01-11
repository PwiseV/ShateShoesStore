import { useState, useEffect } from "react";
import {
  getProducts,
  deleteProduct,
} from "../../../../services/adminProductServices";
import type { Product } from "../types";
import { useToast } from "../../../../context/useToast.ts";

export const useProductData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useToast();

  // Filter States
  const [keyword, setKeyword] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([
    0, 10000000,
  ]);

  const limit = 10;

  const fetchProducts = async (page = currentPage) => {
    setLoading(true);
    console.log("Fetching products with:", { page, limit, keyword, filterCategory });
    try {
      const res = await getProducts({
        page,
        limit,
        keyword,
        category: filterCategory
      });
      setProducts(res.data);
      setTotalPages(Math.ceil(res.pagination.totalPages));
    } catch (err) {
      console.error(err);
      showToast("Lỗi tải danh sách sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    setLoading(true);
    try {
      await deleteProduct(id);
      showToast("Xóa sản phẩm thành công", "success");
      await fetchProducts(currentPage);
    } catch (err) {
      showToast("Lỗi khi xóa sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => fetchProducts(currentPage);

  // Auto fetch when filters/page change
  useEffect(() => {
    fetchProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filterCategory, filterPriceRange]); // Keyword handled separately

  return {
    products,
    loading,
    currentPage,
    totalPages,
    keyword,
    filterCategory,
    filterPriceRange,
    setKeyword,
    setFilterCategory,
    setFilterPriceRange,
    setCurrentPage,
    handleDeleteProduct,
    refreshData,
    fetchProducts,
  };
};
