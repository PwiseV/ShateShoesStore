import { useState, useEffect, useMemo } from "react";
import {
  getCartItems,
  applyCoupon,
  updateCartItemQty as apiUpdateQty,
  removeCartItem as apiRemoveItem,
  updateCartItemVariant as apiUpdateVariant,
  toggleCartItemSelection as apiToggleSelection,
  removeCoupon as apiRemoveCoupon, // Import API mới
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
        // Mặc định chọn tất cả
        setItems(data.map((item) => ({ ...item, selected: true })));
      } catch (err) {
        console.error("Load cart error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const increaseQty = async (id: number | string) => {
    // Tìm item hiện tại để lấy quantity + 1
    const currentItem = items.find((i) => i.id === id);
    if (currentItem) {
      const newCart = await apiUpdateQty(id, currentItem.quantity + 1);
      setItems(newCart);
    }
  };

  const decreaseQty = async (id: number | string) => {
    const currentItem = items.find((i) => i.id === id);
    if (currentItem && currentItem.quantity > 1) {
      const newCart = await apiUpdateQty(id, currentItem.quantity - 1);
      setItems(newCart);
    }
  };

  const removeItem = async (id: number | string) => {
    const newCart = await apiRemoveItem(id);
    setItems(newCart);
  };

  const toggleSelection = async (id: number | string) => {
    const newCart = await apiToggleSelection(id);
    setItems(newCart);
  };

  // Cập nhật Size/Màu
  const updateVariant = async (
    id: number | string,
    newSize: string,
    newColor: CartColor
  ) => {
    const newCart = await apiUpdateVariant(id, newSize, newColor);
    setItems(newCart);
  };

  const total = useMemo(
    () =>
      items.reduce((sum, item) => {
        const price = item.color.price || 0;
        return item.selected ? sum + price * item.quantity : sum;
      }, 0),
    [items]
  );

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

  // Hàm gỡ mã giảm giá
  const removeDiscount = async () => {
    try {
      setLoading(true); // Có thể bật loading nhẹ nếu muốn

      // 1. Gọi API
      const response = await apiRemoveCoupon();

      if (response.success) {
        // 2. Reset State về ban đầu
        setDiscount(0);
        setCouponCode("");
        setCouponMessage("");

        // Có thể return message để UI hiện thông báo
        return { success: true, message: response.message };
      }
    } catch (error) {
      console.error("Lỗi gỡ mã:", error);
    } finally {
      setLoading(false);
    }
  };

  const finalTotal = total - discount;

  return {
    items,
    loading,
    increaseQty,
    decreaseQty,
    removeItem,
    toggleSelection,
    updateVariant,
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
