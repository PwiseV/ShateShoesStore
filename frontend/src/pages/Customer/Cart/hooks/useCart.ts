import { useState, useEffect, useMemo } from "react";
import type { CartItem } from "../types";
import { useToast } from "../../../../context/useToast";

// ==========================================
// KHU VỰC IMPORT SERVICE (CHỌN 1 TRONG 2)
// ==========================================
// CART HOOK - Using Real API Services
// ==========================================

import {
  getCartItems as getCartService,
  updateCartItem as updateCartService,
  removeCartItem as removeCartService,
} from "../../../../services/cartService.ts";

// --- OPTION 2: REAL API (KHI NÀO CÓ BE THÌ MỞ RA & COMMENT OPTION 1 LẠI) ---
// import {
//   getCartItems as getCartService,
//   updateCartItem as updateCartService,
//   removeCartItem as removeCartService,
// } from "../../../../services/cartService";

// ==========================================

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // --- 1. FETCH CART ---
  const fetchCart = async () => {
    // Không set loading true mỗi lần fetch lại để tránh flicker màn hình khi update ngầm
    // Chỉ set loading lúc mount lần đầu
    try {
      const data = await getCartService();

      // Validate data trước khi set
      if (!Array.isArray(data)) {
        console.error("Invalid cart data:", data);
        setItems([]);
        return;
      }

      // Logic FE: Thêm trường selected = true mặc định khi mới load
      // Lưu ý: Nếu BE có lưu trạng thái selected thì bỏ dòng map này đi
      setItems((prevItems) => {
        // Giữ lại trạng thái selected cũ nếu reload lại data (UX tốt hơn)
        if (prevItems.length > 0) {
          return data.map((newItem) => ({
            ...newItem,
            selected:
              prevItems.find((old) => old.cartItemId === newItem.cartItemId)
                ?.selected ?? true,
          }));
        }
        return data.map((item) => ({ ...item, selected: true }));
      });
    } catch (err: any) {
      console.error("Load cart error:", err);
      showToast(err.message || "Lỗi tải giỏ hàng", "error");
      setItems([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- 2. CALCULATE TOTAL (Logic Client Side) ---
  const { total, finalTotal } = useMemo(() => {
    const selectedItems = items.filter((i) => i.selected);
    const totalAmount = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return { total: totalAmount, finalTotal: totalAmount };
  }, [items]);

  // --- 3. ACTIONS ---

  // A. Checkbox Logic (Chỉ xử lý ở Client)
  const toggleSelection = (id: string | number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleAll = (checked: boolean) => {
    setItems((prev) => prev.map((item) => ({ ...item, selected: checked })));
  };

  // B. Update Quantity
  const handleUpdateQuantity = async (
    id: string,
    newQty: number,
    variantId: string
  ) => {
    try {
      // Optimistic Update: Update UI ngay lập tức
      setItems((prev) =>
        prev.map((item) =>
          item.cartItemId === id ? { ...item, quantity: newQty } : item
        )
      );

      // Call cart service to update quantity
      await updateCartService(id, { quantity: newQty, variantId });
    } catch (error: any) {
      console.error("Update qty error", error);
      fetchCart(); // Revert data nếu lỗi
      showToast(error.message || "Không thể cập nhật số lượng", "error");
    }
  };

  const increaseQty = (id: string | number) => {
    const item = items.find((i) => i.cartItemId === id);
    if (item)
      handleUpdateQuantity(item.cartItemId, item.quantity + 1, item.variantId);
  };

  const decreaseQty = (id: string | number) => {
    const item = items.find((i) => i.cartItemId === id);
    if (item && item.quantity > 1) {
      handleUpdateQuantity(item.cartItemId, item.quantity - 1, item.variantId);
    }
  };

  // C. Remove Item
  const removeItem = async (id: string | number) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      await removeCartService(id.toString());

      // Update local state luôn cho nhanh
      setItems((prev) => prev.filter((i) => i.cartItemId !== id));
      showToast("Đã xóa sản phẩm", "success");
    } catch (error: any) {
      console.error("Remove error:", error);
      showToast(error.message || "Lỗi khi xóa sản phẩm", "error");
    }
  };

  // D. Update Variant (Đổi màu/size)
  const updateVariant = async (
    cartItemId: string | number,
    newVariantId: string,
    currentQuantity: number
  ) => {
    setLoading(true); // Cần loading vì đổi variant sẽ thay đổi giá/ảnh
    try {
      await updateCartService(cartItemId.toString(), {
        variantId: newVariantId,
        quantity: currentQuantity,
      });

      // Sau khi update thành công, bắt buộc phải fetch lại
      // để lấy thông tin mới của sản phẩm (Giá mới, Ảnh mới, Tên màu mới...)
      await fetchCart();
      showToast("Cập nhật phân loại thành công", "success");
    } catch (error: any) {
      console.error("Update variant error:", error);
      setLoading(false);
      showToast(error.message || "Lỗi cập nhật phân loại", "error");
    }
  };

  return {
    items,
    loading,
    total,
    finalTotal,
    increaseQty,
    decreaseQty,
    removeItem,
    toggleSelection,
    toggleAll,
    updateVariant,
    refreshCart: fetchCart,
  };
};
