import type {
  CartItem,
  Product,
  CartColor,
  Promotion,
} from "../pages/Customer/Cart/types";
import type { BackendCategory } from "../services/productdetailsServices";

// --- 1. MOCK DATA SẢN PHẨM & CART (Cấu trúc chuẩn) ---

const createCategory = (id: string, name: string): BackendCategory => ({
  categoryId: id,
  name,
  slug: name.toLowerCase(),
  parent: { categoryId: "root", name: "Root", slug: "root" },
});

const productA: Product = {
  id: "101",
  productId: "101",
  title: "Giày Thể Thao Sneakers Basic",
  description: "Giày thể thao năng động, thoáng khí.",
  avatar:
    "https://saigonsneaker.com/wp-content/uploads/2018/11/IMG_1022-430x430.jpg",
  category: createCategory("cat1", "Giày Nam"),
  stock: 100,
  tags: ["giay-nam", "the-thao"],
  sizes: [
    {
      sizeId: "s42",
      size: "42",
      colors: [
        {
          colorId: "c_white",
          color: "White",
          price: 1500000,
          stock: 10,
          avatar:
            "https://saigonsneaker.com/wp-content/uploads/2018/11/IMG_1022-430x430.jpg",
        },
        {
          colorId: "c_black",
          color: "Black",
          price: 1550000,
          stock: 5,
          avatar:
            "https://minhsport.com/wp-content/uploads/2021/06/ao-thun-nam-co-tron-mau-den-minhsport-600x600.jpg",
        },
      ],
    },
    {
      sizeId: "s43",
      size: "43",
      colors: [
        {
          colorId: "c_white_43",
          color: "White",
          price: 1500000,
          stock: 8,
          avatar:
            "https://saigonsneaker.com/wp-content/uploads/2018/11/IMG_1022-430x430.jpg",
        },
      ],
    },
  ],
};

const productB: Product = {
  id: "102",
  productId: "102",
  title: "Giày Thể Thao Basic",
  description: "Chất liệu êm ái.",
  avatar:
    "https://pos.nvncdn.com/54f46e-27401/ps/20260105_uObBK34Lzm.jpeg?v=1767597123",
  category: createCategory("cat2", "Basic"),
  stock: 50,
  tags: [],
  sizes: [
    {
      sizeId: "s38",
      size: "38",
      colors: [
        {
          colorId: "c_white_38",
          color: "White",
          price: 250000,
          stock: 20,
          avatar:
            "https://pos.nvncdn.com/54f46e-27401/ps/20260105_uObBK34Lzm.jpeg?v=1767597123",
        },
        {
          colorId: "c_blue_38",
          color: "Blue",
          price: 260000,
          stock: 15,
          avatar:
            "https://pos.nvncdn.com/54f46e-27401/ps/20260105_uObBK34Lzm.jpeg?v=1767597123",
        },
      ],
    },
  ],
};

const initialMockCart: CartItem[] = [
  {
    id: 1,
    product: productA,
    size: "42",
    color: {
      colorId: "c_white",
      color: "White",
      price: 1500000,
      stock: 10,
      avatar:
        "https://saigonsneaker.com/wp-content/uploads/2018/11/IMG_1022-430x430.jpg",
    },
    quantity: 2,
    selected: true,
  },
  {
    id: 2,
    product: productB,
    size: "38",
    color: {
      colorId: "c_blue_38",
      color: "Blue",
      price: 260000,
      stock: 15,
      avatar:
        "https://pos.nvncdn.com/54f46e-27401/ps/20260105_uObBK34Lzm.jpeg?v=1767597123",
    },
    quantity: 1,
    selected: false,
  },
];

// --- 2. MOCK DATA KHUYẾN MÃI (PROMOTIONS) ---
// Dữ liệu này mô phỏng DB bảng Promotions
const mockPromotions: Promotion[] = [
  {
    id: 1,
    code: "SUMMER2024",
    description: "Giảm 10% cho đơn từ 500k",
    discountType: "PERCENTAGE",
    discountAmount: 10, // 10%
    minOrderAmount: 500000,
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2025-12-31T23:59:59Z",
    totalQuantity: 100,
    status: "ACTIVE",
  },
  {
    id: 2,
    code: "WELCOME50K",
    description: "Giảm trực tiếp 50k (Không giới hạn đơn tối thiểu)",
    discountType: "FIXED_AMOUNT",
    discountAmount: 50000,
    minOrderAmount: 0,
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2026-01-22T23:59:59Z",
    totalQuantity: 50,
    status: "ACTIVE",
  },
  {
    id: 3,
    code: "VIP200",
    description: "Giảm 200k cho đơn từ 5 triệu",
    discountType: "FIXED_AMOUNT",
    discountAmount: 200000,
    minOrderAmount: 5000000,
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2025-12-31T23:59:59Z",
    totalQuantity: 10,
    status: "ACTIVE",
  },
  {
    id: 4,
    code: "HETHAN", // Mã để test case hết hạn
    description: "Mã giảm giá đã hết hạn",
    discountType: "PERCENTAGE",
    discountAmount: 50,
    minOrderAmount: 0,
    startDate: "2023-01-01T00:00:00Z",
    endDate: "2023-12-31T23:59:59Z",
    totalQuantity: 10,
    status: "EXPIRED",
  },
];

// --- 3. HELPER LOCAL STORAGE ---
const CART_STORAGE_KEY = "shopping_cart_data";

const saveToStorage = (cart: CartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

const getFromStorage = (): CartItem[] => {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  return data ? JSON.parse(data) : initialMockCart;
};

// --- 4. API ENDPOINTS (MOCK) ---

/** [GET] Xem giỏ hàng */
export const getCartItems = async (): Promise<CartItem[]> => {
  await new Promise((res) => setTimeout(res, 500));
  return getFromStorage();
};

/** [PUT] Sửa số lượng */
export const updateCartItemQty = async (
  id: number | string,
  quantity: number
): Promise<CartItem[]> => {
  await new Promise((res) => setTimeout(res, 200));

  const currentCart = getFromStorage();
  const updatedCart = currentCart.map((item) => {
    if (item.id === id) {
      // Logic thực tế nên check tồn kho ở đây
      return { ...item, quantity };
    }
    return item;
  });

  saveToStorage(updatedCart);
  return updatedCart;
};

/** [PUT] Sửa mẫu mã (Size/Màu) */
export const updateCartItemVariant = async (
  id: number | string,
  newSize: string,
  newColor: CartColor
): Promise<CartItem[]> => {
  await new Promise((res) => setTimeout(res, 300));

  const currentCart = getFromStorage();
  const updatedCart = currentCart.map((item) => {
    if (item.id === id) {
      return { ...item, size: newSize, color: newColor };
    }
    return item;
  });

  saveToStorage(updatedCart);
  return updatedCart;
};

/** [DELETE] Xóa sản phẩm */
export const removeCartItem = async (
  id: number | string
): Promise<CartItem[]> => {
  await new Promise((res) => setTimeout(res, 300));

  const currentCart = getFromStorage();
  const updatedCart = currentCart.filter((item) => item.id !== id);

  saveToStorage(updatedCart);
  return updatedCart;
};

/** [PATCH/PUT] Chọn/Bỏ chọn sản phẩm */
export const toggleCartItemSelection = async (
  id: number | string
): Promise<CartItem[]> => {
  await new Promise((res) => setTimeout(res, 100));

  const currentCart = getFromStorage();
  const updatedCart = currentCart.map((item) => {
    if (item.id === id) {
      return { ...item, selected: !item.selected };
    }
    return item;
  });

  saveToStorage(updatedCart);
  return updatedCart;
};

/** [POST] Áp dụng mã giảm giá (Logic Validation Đầy Đủ) */
export const applyCoupon = async (
  couponCode: string,
  cartTotal: number
): Promise<{ success: boolean; discount: number; message: string }> => {
  await new Promise((res) => setTimeout(res, 600));

  const codeInput = couponCode.trim().toUpperCase();

  // 1. Tìm coupon trong danh sách mock
  const promo = mockPromotions.find((p) => p.code.toUpperCase() === codeInput);

  // 2. Validate: Tồn tại
  if (!promo) {
    return {
      success: false,
      discount: 0,
      message: "Mã giảm giá không tồn tại!",
    };
  }

  // 3. Validate: Trạng thái (Status)
  if (promo.status !== "ACTIVE") {
    return {
      success: false,
      discount: 0,
      message:
        promo.status === "EXPIRED"
          ? "Mã giảm giá đã hết hạn!"
          : "Mã giảm giá đang bị khóa!",
    };
  }

  // 4. Validate: Thời gian (Date)
  const now = new Date();
  const start = new Date(promo.startDate);
  const end = new Date(promo.endDate);

  if (now < start) {
    return {
      success: false,
      discount: 0,
      message: "Mã giảm giá chưa đến đợt áp dụng!",
    };
  }
  if (now > end) {
    return {
      success: false,
      discount: 0,
      message: "Mã giảm giá đã hết hạn sử dụng!",
    };
  }

  // 5. Validate: Số lượng (Quantity)
  if (promo.totalQuantity <= 0) {
    return {
      success: false,
      discount: 0,
      message: "Mã giảm giá đã hết lượt sử dụng!",
    };
  }

  // 6. Validate: Đơn hàng tối thiểu (Min Order Amount)
  if (cartTotal < promo.minOrderAmount) {
    return {
      success: false,
      discount: 0,
      message: `Đơn hàng cần tối thiểu ${promo.minOrderAmount.toLocaleString(
        "vi-VN"
      )}đ để dùng mã này!`,
    };
  }

  // 7. Tính toán giá trị giảm
  let discountValue = 0;

  if (promo.discountType === "PERCENTAGE") {
    // Tính %: (Tổng tiền * số %) / 100
    discountValue = Math.round((cartTotal * promo.discountAmount) / 100);
  } else if (promo.discountType === "FIXED_AMOUNT") {
    // Trừ thẳng tiền
    discountValue = promo.discountAmount;
  }

  // Không cho giảm quá tổng tiền đơn hàng (tránh âm tiền)
  discountValue = Math.min(discountValue, cartTotal);

  return {
    success: true,
    discount: discountValue,
    message: `Áp dụng thành công: ${promo.description}`,
  };
};

/** * [DELETE] Hủy mã giảm giá
 * Logic: Reset couponId trong DB về null và tính lại tổng tiền (Ở đây mock trả về success)
 */
export const removeCoupon = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  await new Promise((res) => setTimeout(res, 300));

  return {
    success: true,
    message: "Đã hủy mã giảm giá thành công",
  };
};
