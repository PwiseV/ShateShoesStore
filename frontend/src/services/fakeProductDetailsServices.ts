// 1. IMPORT TYPE TỪ FILE CHÍNH (Đã cập nhật theo cấu trúc Backend)
import type {
  Product,
  // ProductImage, // <-- Đã xóa type này
  // ProductSizeVariant, // <-- Đã xóa type này

  // --- Import Type Mới ---
  BackendSizeVariant,
  BackendColorVariant,
  ProductReview,
  Promotion,
  AddToCartRequest,
  AddToCartResponse,
  WishlistResponse,
} from "./productdetailsServices";

// --- DỮ LIỆU REVIEW MẪU ---
const mockReviews: ProductReview[] = [
  {
    reviewId: "r1",
    author: "mattroibecon",
    rating: 5,
    content: "Giày xinh, form chuẩn, đi êm. Shop hỗ trợ nhiệt tình!",
    createdAt: new Date().toISOString(),
    size: "37",
    color: "Hồng",
  },
  {
    reviewId: "r2",
    author: "ngayvuituoi",
    rating: 4,
    content: "Đế êm, màu xinh, giao hàng nhanh.",
    createdAt: new Date().toISOString(),
    size: "36",
    color: "Xanh",
  },
  {
    reviewId: "r3",
    author: "okb3pru1e6",
    rating: 5,
    content: "Form chuẩn, bên ngoài trông cute, rất hài lòng!",
    createdAt: new Date().toISOString(),
    size: "36",
    color: "Vàng",
  },
];

const mockPromotion: Promotion = {
  promotionId: "promo-new-user-001",
  code: "WELCOME10",
  discountType: "PERCENTAGE",
  discountAmount: 10,
  description: "Giảm 10% cho khách hàng mới",
  longDescription:
    "Vì những ấn tượng đầu tiên luôn đặc biệt, [Tên thương hiệu] dành tặng bạn ưu đãi 10% cho lần mua sắm đầu tiên.",
};

// --- HÀM FAKE GET PRODUCT DETAILS ---
export async function getProductDetailsFake(id: string): Promise<Product> {
  // 1. Tạo biến thể (Variant) theo cấu trúc mới
  const sizeList = [35, 36, 37, 38, 39];
  const colorNames = ["Vàng", "Hồng", "Xanh"];
  const BASE_PRICE = 500000;
  const STEP_PRICE = 20000;
  let counter = 0;

  // Map sang BackendSizeVariant
  const sizes: BackendSizeVariant[] = sizeList.map((s) => ({
    sizeId: `size-${s}`,
    size: String(s), // QUAN TRỌNG: Backend trả về chuỗi "35"
    colors: colorNames.map((cName) => {
      const currentPrice = BASE_PRICE + counter * STEP_PRICE;
      counter++;
      let stock = 100;
      if (s === 38) stock = 0;
      if (s === 39 && cName === "Hồng") stock = 0;

      // Map sang BackendColorVariant
      return {
        colorId: `color-${cName}-${s}`,
        color: cName,
        price: currentPrice,
        stock: stock,
        // Giả lập mỗi màu có 1 ảnh riêng (để test gallery)
        avatar:
          cName === "Vàng"
            ? "/imgs/giay-mira-ballet-sneaker-vang-nu.avif"
            : cName === "Hồng"
            ? "/imgs/giay-mira-ballet-sneaker-hong-nu.avif"
            : "/imgs/giay-mira-ballet-sneaker-xanh-duong-nu.avif",
      } as BackendColorVariant;
    }),
  }));

  // 2. Tạo Product theo cấu trúc mới
  const product: Product = {
    id,
    productId: "MIRA-001", // Thêm mã SP
    title: "MIRA MARY SNEAKER",

    // Cấu trúc Category mới (categoryId thay vì id)
    category: {
      categoryId: "cat-suc-bup-be",
      name: "Giày Sục & Giày Búp Bê",
      slug: "giay-suc-va-giay-bup-be",
      parent: {
        categoryId: "cat-giay-nu",
        name: "Giày Dép Nữ",
        slug: "giay-dep-nu",
      },
    },

    // Description: Chuỗi dài nối bằng \n (Thay vì mảng)
    description: `Bạn nào mê phong cách retro - preppy kiểu Nhật...\nForm MaryJane phối hai dây chéo cực xinh...\nMũi bo tròn, đế thấp dễ đi...\nCác màu basic dễ phối.\n👟 Hàng sẵn SL ít các nàng nhanh tay pick ẻm nha.`,

    // Avatar: 1 chuỗi String (Thay vì mảng object)
    avatar: "/imgs/giay-mira-ballet-sneaker-xanh-duong-nu.avif",

    stock: 500, // Tổng tồn kho giả định

    rating: { value: 4.8, count: 253 },

    sizes: sizes,
  };

  await delay(500);
  return product;
}

export async function getProductReviewsFake(
  productId: string
): Promise<ProductReview[]> {
  await delay(300);
  return mockReviews;
}

export async function getProductPromotionFake(
  productId: string
): Promise<Promotion | null> {
  await delay(200);
  return mockPromotion;
}

export async function addToCartFake(
  payload: AddToCartRequest
): Promise<AddToCartResponse> {
  await delay(500);
  const product = await getProductDetailsFake(payload.productId);

  let foundStock = 0;
  let found = false;

  for (const s of product.sizes) {
    const variant = s.colors.find((c) => c.colorId === payload.variantId);
    if (variant) {
      foundStock = variant.stock;
      found = true;
      break;
    }
  }

  if (!found)
    return {
      success: false,
      message: "Sản phẩm không tồn tại hoặc lỗi dữ liệu!",
    };

  if (payload.quantity > foundStock) {
    return {
      success: false,
      message: `Rất tiếc, số lượng bạn chọn vượt quá tồn kho! (Hiện chỉ còn ${foundStock} sản phẩm)`,
    };
  }

  return { success: true, message: "Thêm vào giỏ hàng thành công!" };
}

export async function addToWishlistFake(
  productId: string
): Promise<WishlistResponse> {
  await delay(300);
  return { success: true, message: "Đã thêm sản phẩm vào danh mục yêu thích!" };
}

export async function removeFromWishlistFake(
  productId: string
): Promise<WishlistResponse> {
  await delay(300);
  return {
    success: true,
    message: "Đã xóa sản phẩm khỏi danh mục yêu thích!!!",
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
