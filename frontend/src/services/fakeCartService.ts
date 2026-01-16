import type { CartItem } from "../pages/Customer/Cart/types";

let mockCart: CartItem[] = [
    {
        id: 1,
        product: {
            id: '101',
            name: "Giày Thể Thao A",
            image: "https://saigonsneaker.com/wp-content/uploads/2018/11/IMG_1022-430x430.jpg",
            priceVnd: 1500000,
            rating: 4.5,
        },
        size: "42",
        color: {
            color: "White",
            price: 0,
            stock: 10,
            avatar: "/images/colors/red.png",
        },
        quantity: 2,
    },
    {
        id: 2,
        product: {
            id: '102',
            name: "Giày Thể Thao B",
            image: "https://pos.nvncdn.com/54f46e-27401/ps/20260105_uObBK34Lzm.jpeg?v=1767597123",
            priceVnd: 2000000,
            rating: 4.0,
        },
        size: "40",
        color: {
            color: "White",
            price: 0,
            stock: 5,
            avatar: "/images/colors/blue.png",
        },
        quantity: 1,
    },
];

const mockCoupons: Record<string, number> = {
  "GIAM10": 10,
  "SALE20": 20,
  "FREESHIP": 50000,
  "NEWUSER": 100000,
};

export const getCartItems = async (): Promise<CartItem[]> => {
  await new Promise(res => setTimeout(res, 600));
  return [...mockCart];
};

export const updateCartItemQty = async (id: number, quantity: number): Promise<CartItem> => {
  await new Promise(res => setTimeout(res, 300));
  const item = mockCart.find(i => i.id === id);
  if (!item) throw new Error("Item not found");
  item.quantity = quantity;
  return { ...item };
};

export const removeCartItem = async (id: number): Promise<void> => {
  await new Promise(res => setTimeout(res, 300));
  mockCart = mockCart.filter(i => i.id !== id);
};

export const applyCoupon = async (
  couponCode: string,
  cartTotal: number
): Promise<{ success: boolean; discount: number; message: string }> => {
  await new Promise(res => setTimeout(res, 600));

  const upperCode = couponCode.trim().toUpperCase();
  const percent = mockCoupons[upperCode];

  if (!percent) {
    return { success: false, discount: 0, message: "Mã giảm giá không hợp lệ" };
  }

  let discountValue = 0;

  if (percent <= 100) {
    discountValue = Math.round((cartTotal * percent) / 100);
  } else {
    discountValue = percent;
  }

  discountValue = Math.min(discountValue, cartTotal);

  return {
    success: true,
    discount: discountValue,
    message: `Áp dụng thành công: Giảm ${discountValue.toLocaleString('vi-VN')}đ`,
  };
};