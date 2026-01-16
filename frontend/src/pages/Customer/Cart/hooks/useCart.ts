import { useState, useEffect, useMemo } from "react";
import {
  getCartItems,
  applyCoupon,
} from "../../../../services/fakeCartService";
import type { CartItem, CartColor } from "../types";

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartItems();
        // Mặc định chọn tất cả sản phẩm khi mới load
        setItems(data.map((item) => ({ ...item, selected: true })));
      } catch (err) {
        console.error("Load cart error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const increaseQty = (id: number | string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number | string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number | string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleSelection = (id: number | string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // --- Logic mới: Cập nhật Biến thể (Size/Màu) ---
  const updateVariant = (
    id: number | string,
    newSize: string,
    newColor: CartColor
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, size: newSize, color: newColor } : item
      )
    );
  };

  const applyDiscount = async (code: string) => {
    if (!code.trim()) {
      return {
        success: false,
        discount: 0,
        message: "Vui lòng nhập mã giảm giá",
      };
    }
    try {
      const result = await applyCoupon(code, total);
      if (result.success) {
        setDiscount(result.discount);
        setCouponCode(code.trim().toUpperCase());
        setCouponMessage(result.message);
        return result;
      } else {
        setDiscount(0);
        setCouponMessage(result.message);
        return result;
      }
    } catch (err) {
      setCouponMessage("Có lỗi xảy ra khi áp dụng mã");
      setDiscount(0);
      return {
        success: false,
        discount: 0,
        message: "Có lỗi xảy ra khi áp dụng mã",
      };
    }
  };

  const removeDiscount = () => {
    setDiscount(0);
    setCouponCode("");
    setCouponMessage("");
  };

  // --- Tính toán lại Total dựa trên giá của Color Variant ---
  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        // Ưu tiên lấy giá của màu đã chọn, fallback về 0 nếu lỗi data
        const price = item.color.price || 0;
        return item.selected ? sum + price * item.quantity : sum;
      }, 0),
    [items]
  );

  const finalTotal = total - discount;

  return {
    items,
    loading,
    increaseQty,
    decreaseQty,
    removeItem,
    toggleSelection,
    updateVariant, // Export hàm này
    total,
    discount,
    finalTotal,
    couponCode,
    setCouponCode,
    applyDiscount,
    couponMessage,
    removeDiscount,
  };
};
