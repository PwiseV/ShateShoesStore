// IMPORT TẤT CẢ TYPE TỪ FILE CHÍNH
import type {
  Product,
  ProductImage,
  Rating,
  ProductSizeVariant,
  // --- Import các Type mới ---
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

// --- CÁC HÀM FAKE GIỮ NGUYÊN ---
// (Chỉ cần đảm bảo tên Type khớp với file import là được)

export async function getProductDetailsFake(id: string): Promise<Product> {
  // ... (Code cũ giữ nguyên)
  const images: ProductImage[] = [
    {
      id: "img-1",
      src: "/imgs/giay-mira-ballet-sneaker-xanh-duong-nu.avif",
      alt: "Main image",
    },
    {
      id: "img-2",
      src: "/imgs/giay-mira-ballet-sneaker-hong-nu.avif",
      alt: "Thumb 1",
    },
    {
      id: "img-3",
      src: "/imgs/giay-mira-ballet-sneaker-vang-nu.avif",
      alt: "Thumb 2",
    },
  ];

  const sizeList = [35, 36, 37, 38, 39];
  const colorNames = ["Vàng", "Hồng", "Xanh"];
  const BASE_PRICE = 500000;
  const STEP_PRICE = 20000;
  let counter = 0;

  const sizes: ProductSizeVariant[] = sizeList.map((s) => ({
    sizeId: `size-${s}`,
    size: s,
    colors: colorNames.map((cName) => {
      const currentPrice = BASE_PRICE + counter * STEP_PRICE;
      counter++;
      let stock = 100;
      if (s === 38) stock = 0;
      if (s === 39 && cName === "Hồng") stock = 0;
      return {
        colorId: `color-${cName}-${s}`,
        color: cName,
        price: currentPrice,
        stock: stock,
      };
    }),
  }));

  const rating: Rating = { value: 4.8, count: 253 };

  const product: Product = {
    id,
    title: "MIRA MARY SNEAKER",
    category: {
      id: "cat-suc-bup-be",
      name: "Giày Sục & Giày Búp Bê",
      slug: "giay-suc-va-giay-bup-be",
      parent: { id: "cat-giay-nu", name: "Giày Dép Nữ", slug: "giay-dep-nu" },
    },
    description: [
      "Bạn nào mê phong cách retro - preppy kiểu Nhật...",
      "Form MaryJane phối hai dây chéo cực xinh...",
      "Mũi bo tròn, đế thấp dễ đi...",
      "Các màu basic dễ phối.",
      "👟 Hàng sẵn SL ít các nàng nhanh tay pick ẻm nha.",
    ],
    tag: ["Giày đi làm", "Giày đi chơi", "Giày Nhật"],
    avatar: images,
    rating,
    sizes,
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
