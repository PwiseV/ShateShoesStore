import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../../../../context/useToast";
import {
  getAvailableCoupons,
  validateCoupon,
  createOrder,
  getUserAddresses,
  createUserAddress,
  updateUserAddress,
} from "../../../../services/checkoutService";
import type { CartItem } from "../../Cart/types";
import type { Coupon, CreateOrderPayload, Address } from "../types";

export const useCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const cartState = location.state as {
    items: CartItem[];
    total: number;
    finalTotal: number;
  } | null;

  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  // Data State
  const [items, setItems] = useState<CartItem[]>([]);
  const [listAddresses, setListAddresses] = useState<Address[]>([]);
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // Form State
  const [receiverName, setReceiverName] = useState("");
  const [phone, setPhone] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [note, setNote] = useState("");

  // --- HELPER: Hàm lấy địa chỉ ---
  const fetchAddressData = useCallback(async () => {
    try {
      const addresses = await getUserAddresses();
      setListAddresses(addresses);

      if (addresses && addresses.length > 0) {
        const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
        if (defaultAddr) {
          setFullAddress(
            `${defaultAddr.street}, ${defaultAddr.ward}, ${defaultAddr.district}, ${defaultAddr.city}`
          );
        }
      }
    } catch (error) {
      console.error("Lỗi lấy địa chỉ:", error);
    }
  }, []);

  // --- 1. WORKFLOW KHỞI TẠO ---
  useEffect(() => {
    if (!cartState || !cartState.items || cartState.items.length === 0) {
      showToast("Giỏ hàng trống hoặc truy cập không hợp lệ", "error");
      navigate("/users/cart");
      return;
    }

    setItems(cartState.items);

    const initData = async () => {
      setInitLoading(true);

      // 1. Lấy địa chỉ
      await fetchAddressData();

      // 2. Lấy coupon
      try {
        const coupons = await getAvailableCoupons(cartState.total);
        setAvailableCoupons(coupons);
      } catch (error) {
        console.error("Lỗi lấy coupon:", error);
      }

      setInitLoading(false);
    };

    initData();
  }, [cartState, navigate, showToast, fetchAddressData]);

  // --- 2. WORKFLOW QUẢN LÝ ĐỊA CHỈ ---
  const handleAddAddress = async (payload: Omit<Address, "addressId">) => {
    setLoading(true);
    try {
      await createUserAddress(payload);
      showToast("Thêm địa chỉ thành công", "success");
      await fetchAddressData();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Lỗi thêm địa chỉ";
      showToast(msg, "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAddress = async (
    id: number,
    payload: Omit<Address, "addressId">
  ) => {
    setLoading(true);
    try {
      await updateUserAddress(id, payload);
      showToast("Cập nhật địa chỉ thành công", "success");
      await fetchAddressData();
    } catch (error: any) {
      const msg = error.response?.data?.message || "Lỗi cập nhật địa chỉ";
      showToast(msg, "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // --- 3. WORKFLOW XỬ LÝ COUPON (CÓ SỬA ĐỔI QUAN TRỌNG) ---
  const priceSummary = useMemo(() => {
    const subtotal = cartState?.total || 0;
    const shippingFee = 30000;
    let discountAmount = 0;

    if (selectedCoupon) {
      if (selectedCoupon.discountType === "percentage") {
        discountAmount = (subtotal * selectedCoupon.discountValue) / 100;
      } else {
        discountAmount = selectedCoupon.discountValue;
      }
    }
    if (discountAmount > subtotal) discountAmount = subtotal;

    return {
      subtotal,
      shippingFee,
      discountAmount,
      total: subtotal + shippingFee - discountAmount,
    };
  }, [cartState, selectedCoupon]);

  const handleSelectCoupon = (coupon: Coupon) => {
    // Logic kiểm tra min order khi click chọn từ list
    // (Lưu ý: Logic này chỉ kiểm tra sơ bộ, logic chính vẫn nằm ở validateCoupon khi user nhập tay)
    if (cartState && cartState.total < coupon.minOrderValue) {
      showToast(
        `Đơn tối thiểu ${coupon.minOrderValue.toLocaleString()}đ`,
        "warning"
      );
      return;
    }
    setSelectedCoupon((prev) =>
      prev?.promotionId === coupon.promotionId ? null : coupon
    );
  };

  // --- ĐÂY LÀ CHỖ CẦN SỬA ---
  const handleApplyCouponCode = async (code: string) => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const total = cartState?.total || 0;
      // Gọi hàm validateCoupon (hàm này giờ đã có logic check status, date, stock...)
      const validCoupon = await validateCoupon(code, total);

      setSelectedCoupon(validCoupon);
      showToast("Áp dụng mã thành công", "success");
    } catch (error: any) {
      // SỬA LẠI: Ưu tiên lấy error.message (từ new Error bên service)
      // Nếu không có thì mới tìm trong error.response (từ Axios)
      const msg =
        error.message || error.response?.data?.message || "Mã không hợp lệ";

      showToast(msg, "error");
      setSelectedCoupon(null);
    } finally {
      setLoading(false);
    }
  };
  // -------------------------

  // --- 4. WORKFLOW ĐẶT HÀNG ---
  const handlePlaceOrder = async () => {
    if (!receiverName || !phone || !fullAddress) {
      showToast("Vui lòng điền đủ thông tin nhận hàng", "error");
      return;
    }
    setLoading(true);
    try {
      const payload: CreateOrderPayload = {
        shippingFee: priceSummary.shippingFee,
        total: priceSummary.total,
        name: receiverName,
        phone: phone,
        address: fullAddress,
        note: note,
        paymentMethod: "COD",
        promotionId: selectedCoupon ? selectedCoupon.promotionId : null,
        items: items.map((item) => ({
          cartItemId: item.cartItemId,
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      };
      await createOrder(payload);
      showToast("Đặt hàng thành công!", "success");
      navigate("/order-success");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Lỗi đặt hàng";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    listAddresses,
    availableCoupons,
    selectedCoupon,
    priceSummary,
    receiverName,
    setReceiverName,
    phone,
    setPhone,
    fullAddress,
    setFullAddress,
    note,
    setNote,
    handleApplyCouponCode,
    handleSelectCoupon,
    handlePlaceOrder,
    handleAddAddress,
    handleUpdateAddress,
    loading: loading || initLoading,
  };
};
