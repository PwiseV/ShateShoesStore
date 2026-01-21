import type {
  CartItem,
  UpdateCartPayload,
  BackendCartVariant,
} from "../pages/Customer/Cart/types";

// --- 1. MOCK DATA (Giả lập Database) ---
// Giả lập độ trễ mạng (500ms)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Dữ liệu mẫu ban đầu
let MOCK_CART_DB: CartItem[] = [
  {
    cartItemId: "cart_item_1",
    variantId: "var_shoe_42_white",
    quantity: 1,
    size: "42",
    color: "Trắng",
    price: 1500000,
    stock: 10,
    avatar:
      "https://img.freepik.com/free-photo/white-sneaker-isolated-white-background-sportswear_1339-106509.jpg",
    isOutOfStock: false,
    isAdjust: false,
    product: {
      productId: "prod_shoe_01",
      code: "SNK001",
      title: "Giày Sneaker Basic Thể Thao",
      description:
        "Giày sneaker trắng phong cách basic, phù hợp đi học đi làm.",
      avatar:
        "https://img.freepik.com/free-photo/white-sneaker-isolated-white-background-sportswear_1339-106509.jpg",
      sizes: [
        {
          size: "42",
          colors: [
            {
              variantId: "var_shoe_42_white",
              color: "Trắng",
              price: 1500000,
              stock: 10,
              avatar:
                "https://img.freepik.com/free-photo/white-sneaker-isolated-white-background-sportswear_1339-106509.jpg",
            },
            {
              variantId: "var_shoe_42_black",
              color: "Đen",
              price: 1550000, // Màu đen đắt hơn xíu
              stock: 5,
              avatar:
                "https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg",
            },
          ],
        },
        {
          size: "43",
          colors: [
            {
              variantId: "var_shoe_43_white",
              color: "Trắng",
              price: 1500000,
              stock: 0, // Hết hàng size 43 trắng
              avatar:
                "https://img.freepik.com/free-photo/white-sneaker-isolated-white-background-sportswear_1339-106509.jpg",
            },
            {
              variantId: "var_shoe_43_black",
              color: "Đen",
              price: 1550000,
              stock: 8,
              avatar:
                "https://img.freepik.com/free-photo/pair-trainers_144627-3800.jpg",
            },
          ],
        },
      ],
    },
  },
  {
    cartItemId: "cart_item_2",
    variantId: "var_shirt_m_blue",
    quantity: 2,
    size: "M",
    color: "Xanh Dương",
    price: 350000,
    stock: 20,
    avatar: "https://img.freepik.com/free-photo/blue-t-shirt_125540-727.jpg",
    isOutOfStock: false,
    isAdjust: false,
    product: {
      productId: "prod_shirt_02",
      code: "TSHIRT02",
      title: "Áo Thun Cotton Basic",
      description: "Chất liệu 100% Cotton thoáng mát.",
      avatar: "https://img.freepik.com/free-photo/blue-t-shirt_125540-727.jpg",
      sizes: [
        {
          size: "M",
          colors: [
            {
              variantId: "var_shirt_m_blue",
              color: "Xanh Dương",
              price: 350000,
              stock: 20,
              avatar:
                "https://img.freepik.com/free-photo/blue-t-shirt_125540-727.jpg",
            },
            {
              variantId: "var_shirt_m_red",
              color: "Đỏ",
              price: 350000,
              stock: 15,
              avatar:
                "https://img.freepik.com/free-photo/red-t-shirt_125540-719.jpg",
            },
          ],
        },
        {
          size: "L",
          colors: [
            {
              variantId: "var_shirt_l_blue",
              color: "Xanh Dương",
              price: 360000,
              stock: 10,
              avatar:
                "https://img.freepik.com/free-photo/blue-t-shirt_125540-727.jpg",
            },
          ],
        },
      ],
    },
  },
];

// Helper: Tìm thông tin variant chi tiết trong cấu trúc lồng nhau
const findVariantInfoInProduct = (
  product: CartItem["product"],
  variantId: string
): BackendCartVariant | null => {
  for (const sizeObj of product.sizes) {
    const foundColor = sizeObj.colors.find((c) => c.variantId === variantId);
    if (foundColor) return foundColor;
  }
  return null;
};

// --- 2. IMPLEMENT API ---

// 1. Lấy danh sách giỏ hàng
export const getCartItems = async (): Promise<CartItem[]> => {
  await delay(600); // Giả lập mạng chậm
  // Clone data để tránh tham chiếu trực tiếp
  return JSON.parse(JSON.stringify(MOCK_CART_DB));
};

// 2. Cập nhật số lượng / Size / Màu (PATCH)
export const updateCartItem = async (
  cartItemId: string,
  payload: UpdateCartPayload
): Promise<any> => {
  await delay(400);

  const itemIndex = MOCK_CART_DB.findIndex((i) => i.cartItemId === cartItemId);
  if (itemIndex === -1) {
    throw new Error("Không tìm thấy sản phẩm trong giỏ hàng");
  }

  const currentItem = MOCK_CART_DB[itemIndex];

  // Logic cập nhật
  // 2.1 Nếu đổi Variant (Size/Màu)
  if (payload.variantId && payload.variantId !== currentItem.variantId) {
    // Tìm thông tin variant mới trong product của item đó
    const newVariantInfo = findVariantInfoInProduct(
      currentItem.product,
      payload.variantId
    );

    if (!newVariantInfo) {
      throw new Error("Biến thể sản phẩm không tồn tại");
    }

    // Kiểm tra tồn kho variant mới
    if (newVariantInfo.stock < payload.quantity) {
      throw new Error(`Biến thể này chỉ còn ${newVariantInfo.stock} sản phẩm`);
    }

    // Cập nhật lại item trong DB giả
    MOCK_CART_DB[itemIndex] = {
      ...currentItem,
      variantId: newVariantInfo.variantId,
      color: newVariantInfo.color,
      price: newVariantInfo.price,
      avatar: newVariantInfo.avatar,
      stock: newVariantInfo.stock,
      quantity: payload.quantity, // Cập nhật luôn số lượng nếu có
      // Tìm size name tương ứng (hơi ngược nhưng cần thiết để hiển thị đúng)
      size:
        currentItem.product.sizes.find((s) =>
          s.colors.some((c) => c.variantId === newVariantInfo.variantId)
        )?.size || currentItem.size,
    };

    return { message: "Cập nhật phân loại thành công" };
  }

  // 2.2 Nếu chỉ đổi số lượng (giữ nguyên variant cũ)
  if (payload.quantity) {
    // Check tồn kho hiện tại
    if (payload.quantity > currentItem.stock) {
      throw new Error(
        `Số lượng vượt quá tồn kho (Còn lại: ${currentItem.stock})`
      );
    }
    MOCK_CART_DB[itemIndex].quantity = payload.quantity;
    return { message: "Cập nhật số lượng thành công" };
  }

  return { message: "Không có gì thay đổi" };
};

// 3. Xóa sản phẩm (DELETE)
export const removeCartItem = async (cartItemId: string): Promise<any> => {
  await delay(300);
  const initialLength = MOCK_CART_DB.length;
  MOCK_CART_DB = MOCK_CART_DB.filter((i) => i.cartItemId !== cartItemId);

  if (MOCK_CART_DB.length === initialLength) {
    throw new Error("Xóa thất bại, sản phẩm không tồn tại");
  }

  return { message: "Xóa sản phẩm thành công" };
};
