import type {
  FavouriteProduct,
  GetFavouriteResponse,
  RemoveFavouriteResponse, // Import type mới
} from "./favouriteServices";

/* ============================
   MOCK DATABASE
============================ */
let MOCK_DB: FavouriteProduct[] = [
  // ... (Giữ nguyên data cũ của bạn) ...
  {
    favouriteId: "fav_001",
    productId: "695d9cc5c96f36869d77704c",
    code: "SHOE-NK-001",
    title: "Nike Air Jordan 1 Retro High xiu đẹp",
    description: "Giày bóng rổ huyền thoại...",
    tag: ["nike", "nice", "giày lười"],
    slug: "nike-air-jordan-1-retro-high-xiu-dep",
    avatar:
      "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768168732/products/wqgylhs8jzfio7krastf.png",
    category: {
      categoryId: "cat_01",
      name: "Giày Lười",
      slug: "giay-luoi",
      parent: {
        categoryId: "cat_parent_01",
        name: "Giày Nam",
        slug: "giay-nam",
      },
    },
    stock: 2436,
    rating: 5,
    min_price: 2000000,
    sizes: [],
  },
  {
    favouriteId: "fav_002",
    productId: "prod_002",
    code: "SHOE-AD-002",
    title: "Adidas Ultraboost Light",
    description: "Chạy bộ êm ái...",
    tag: ["adidas", "running"],
    slug: "adidas-ultraboost-light",
    avatar:
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&q=80",
    category: {
      categoryId: "cat_02",
      name: "Giày Chạy Bộ",
      slug: "giay-chay-bo",
    },
    stock: 100,
    rating: 4.8,
    min_price: 4200000,
    sizes: [],
  },
];

/* ============================
   FAKE SERVICES IMPLEMENTATION
============================ */

export const getFavouriteList = async (
  page: number = 1,
  limit: number = 6,
): Promise<GetFavouriteResponse> => {
  await new Promise((res) => setTimeout(res, 500));

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = MOCK_DB.slice(startIndex, endIndex);

  return {
    message: "Fetched favourites successfully",
    count: MOCK_DB.length,
    data: paginatedData,
  };
};

// [CẬP NHẬT] Trả về object có message
export const removeFromFavourite = async (
  productId: string,
): Promise<RemoveFavouriteResponse> => {
  await new Promise((res) => setTimeout(res, 300));
  MOCK_DB = MOCK_DB.filter((item) => item.productId !== productId);

  return {
    message: "Removed from favourite",
    data: {
      _id: "mock_id",
      productId: productId,
      userId: "mock_user_id",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
    },
  };
};

export const addToFavourite = async (productId: string): Promise<void> => {
  await new Promise((res) => setTimeout(res, 300));
  console.log("Add to favorites:", productId);
};
