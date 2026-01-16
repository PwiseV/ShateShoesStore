import { useState, useEffect, useMemo } from 'react';
import { getCartItems, applyCoupon } from '../../../../services/fakeCartService';
import type { CartItem } from '../types';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartItems();
        setItems(data);
      } catch (err) {
        console.error("Load cart error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const increaseQty = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const applyDiscount = async (code: string) => {
    if (!code.trim()) {
        return { success: false, discount: 0, message: "Vui lòng nhập mã giảm giá" };
    }

    try {
        const result = await applyCoupon(code, total);
        if (result.success) {
        setDiscount(result.discount);
        setCouponCode(code.trim().toUpperCase());
        setCouponMessage(result.message);
        return result; // ← trả về để component dùng ngay
        } else {
        setDiscount(0);
        setCouponMessage(result.message);
        return result;
        }
    } catch (err) {
        setCouponMessage("Có lỗi xảy ra khi áp dụng mã");
        setDiscount(0);
        return { success: false, discount: 0, message: "Có lỗi xảy ra khi áp dụng mã" };
    }
    };

  const removeDiscount = () => {
    setDiscount(0);
    setCouponCode('');
    setCouponMessage('');
  };

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.priceVnd * item.quantity, 0),
    [items]
  );

  const finalTotal = total - discount;

  return {
    items,
    loading,
    increaseQty,
    decreaseQty,
    removeItem,
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