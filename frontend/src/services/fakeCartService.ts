import type { CartItem, Product } from "../pages/Costumer/Cart/types";

// Helper để tạo data gọn hơn
const createCategory = (id: string, name: string) => ({
  categoryId: id,
  name,
  slug: name.toLowerCase(),
  parent: { categoryId: "root", name: "Root", slug: "root" },
});

// 1. Mock Data Sản Phẩm (để tái sử dụng)
const productA: Product = {
  productId: 101,
  code: "SP-001",
  title: "Giày Thể Thao Sneakers Basic",
  description: "Giày thể thao năng động, thoáng khí.",
  avatar:
    "https://saigonsneaker.com/wp-content/uploads/2018/11/IMG_1022-430x430.jpg",
  category: createCategory("cat1", "Giày Nam"),
  sizeOptions: [
    {
      size: "42",
      colors: [
        {
          color: "White",
          price: 1500000,
          stock: 10,
          avatar:
            "https://saigonsneaker.com/wp-content/uploads/2018/11/IMG_1022-430x430.jpg",
        },
        {
          color: "Black",
          price: 1550000,
          stock: 5,
          avatar:
            "https://minhsport.com/wp-content/uploads/2021/06/ao-thun-nam-co-tron-mau-den-minhsport-600x600.jpg",
        },
      ],
    },
    {
      size: "43",
      colors: [
        {
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
  productId: 102,
  code: "SP-002",
  title: "Giày Thể Thao Basic",
  description: "Chất liệu êm ái, bền bỉ.",
  avatar:
    "https://pos.nvncdn.com/54f46e-27401/ps/20260105_uObBK34Lzm.jpeg?v=1767597123",
  category: createCategory("cat2", "Basic"),
  sizeOptions: [
    {
      size: "38",
      colors: [
        {
          color: "White",
          price: 250000,
          stock: 20,
          avatar:
            "https://pos.nvncdn.com/54f46e-27401/ps/20260105_uObBK34Lzm.jpeg?v=1767597123",
        },
        {
          color: "Blue",
          price: 260000,
          stock: 15,
          avatar:
            "https://pos.nvncdn.com/54f46e-27401/ps/20260105_uObBK34Lzm.jpeg?v=1767597123",
        },
      ],
    },
    {
      size: "39",
      colors: [
        {
          color: "White",
          price: 250000,
          stock: 10,
          avatar:
            "https://pos.nvncdn.com/54f46e-27401/ps/20260105_uObBK34Lzm.jpeg?v=1767597123",
        },
      ],
    },
  ],
};

// 2. Mock Cart Item (Dữ liệu ban đầu trong giỏ)
let mockCart: CartItem[] = [
  {
    id: 1,
    product: productA,
    size: "42",
    // Color khớp với sizeOptions của size 42
    color: {
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
    // SỬA: Đổi từ "M" thành "38" để khớp với sizeOptions của productB
    size: "38",
    color: {
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

const mockCoupons: Record<string, number> = {
  GIAM10: 10,
  SALE20: 20,
  FREESHIP: 50000,
  NEWUSER: 100000,
};

// --- API SIMULATION ---

export const getCartItems = async (): Promise<CartItem[]> => {
  await new Promise((res) => setTimeout(res, 600));
  // Trả về bản copy để tránh mutation trực tiếp vào mock gốc ngoài ý muốn
  return JSON.parse(JSON.stringify(mockCart));
};

export const updateCartItemQty = async (
  id: number,
  quantity: number
): Promise<CartItem> => {
  await new Promise((res) => setTimeout(res, 300));
  const item = mockCart.find((i) => i.id === id);
  if (!item) throw new Error("Item not found");
  item.quantity = quantity;
  return { ...item };
};

export const removeCartItem = async (id: number): Promise<void> => {
  await new Promise((res) => setTimeout(res, 300));
  mockCart = mockCart.filter((i) => i.id !== id);
};

export const applyCoupon = async (
  couponCode: string,
  cartTotal: number
): Promise<{ success: boolean; discount: number; message: string }> => {
  await new Promise((res) => setTimeout(res, 600));

  const upperCode = couponCode.trim().toUpperCase();
  const val = mockCoupons[upperCode];

  if (val === undefined) {
    return { success: false, discount: 0, message: "Mã giảm giá không hợp lệ" };
  }

  let discountValue = 0;

  // Nếu giá trị <= 100 thì tính theo %
  if (val <= 100) {
    discountValue = Math.round((cartTotal * val) / 100);
  } else {
    // Nếu > 100 thì trừ thẳng tiền
    discountValue = val;
  }

  // Giảm giá không quá tổng tiền
  discountValue = Math.min(discountValue, cartTotal);

  return {
    success: true,
    discount: discountValue,
    message: `Áp dụng thành công: Giảm ${discountValue.toLocaleString(
      "vi-VN"
    )}đ`,
  };
};
