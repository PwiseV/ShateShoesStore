import type {
  FavouriteProduct,
  GetFavouriteResponse,
  RemoveFavouriteResponse, // Import type mới
} from "./favouriteServices";

/* ============================
   MOCK DATABASE
============================ */
let MOCK_DB: FavouriteProduct[] = [
  {
    favouriteId: "fav_001",
    productId: "prod_001",
    code: "SHOE-NK-001",
    title: "Nike Air Jordan 1 Retro High",
    description: "Giày bóng rổ huyền thoại...",
    tag: ["nike", "best-seller"],
    slug: "nike-air-jordan-1",
    avatar:
      "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768168732/products/wqgylhs8jzfio7krastf.png",
    category: { categoryId: "c1", name: "Giày Nam", slug: "giay-nam" },
    stock: 24,
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
    slug: "adidas-ultraboost",
    avatar:
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&q=80",
    category: { categoryId: "c2", name: "Chạy Bộ", slug: "chay-bo" },
    stock: 100,
    rating: 4.8,
    min_price: 4200000,
    sizes: [],
  },
  {
    favouriteId: "fav_003",
    productId: "prod_003",
    code: "SHOE-NB-003",
    title: "New Balance 530 Retro",
    description: "Phong cách cổ điển...",
    tag: ["new-balance", "retro"],
    slug: "new-balance-530",
    avatar:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    category: { categoryId: "c3", name: "Sneaker", slug: "sneaker" },
    stock: 50,
    rating: 4.7,
    min_price: 2800000,
    sizes: [],
  },
  {
    favouriteId: "fav_004",
    productId: "prod_004",
    code: "SHOE-PM-004",
    title: "Puma RS-X Geek",
    description: "Thiết kế hầm hố...",
    tag: ["puma", "streetwear"],
    slug: "puma-rs-x",
    avatar:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    category: { categoryId: "c3", name: "Sneaker", slug: "sneaker" },
    stock: 30,
    rating: 4.5,
    min_price: 3100000,
    sizes: [],
  },
  {
    favouriteId: "fav_005",
    productId: "prod_005",
    code: "SHOE-CV-005",
    title: "Converse Chuck 70 High",
    description: "Vải canvas bền bỉ...",
    tag: ["converse", "classic"],
    slug: "converse-chuck-70",
    avatar:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&q=80",
    category: { categoryId: "c1", name: "Giày Nam", slug: "giay-nam" },
    stock: 200,
    rating: 4.9,
    min_price: 1900000,
    sizes: [],
  },
  {
    favouriteId: "fav_006",
    productId: "prod_006",
    code: "SHOE-VN-006",
    title: "Vans Old Skool Classic",
    description: "Dành cho skater...",
    tag: ["vans", "skate"],
    slug: "vans-old-skool",
    avatar:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    category: { categoryId: "c3", name: "Sneaker", slug: "sneaker" },
    stock: 150,
    rating: 4.8,
    min_price: 1850000,
    sizes: [],
  },
  // --- HẾT TRANG 1 (6 Items) ---

  // --- BẮT ĐẦU TRANG 2 ---
  {
    favouriteId: "fav_007",
    productId: "prod_007",
    code: "SHOE-AS-007",
    title: "Asics Gel-Kayano 14",
    description: "Hỗ trợ chạy đường dài...",
    tag: ["asics", "running"],
    slug: "asics-gel-kayano",
    avatar:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    category: { categoryId: "c2", name: "Chạy Bộ", slug: "chay-bo" },
    stock: 40,
    rating: 4.7,
    min_price: 3800000,
    sizes: [],
  },
  {
    favouriteId: "fav_008",
    productId: "prod_008",
    code: "SHOE-RB-008",
    title: "Reebok Club C 85",
    description: "Phong cách tennis cổ điển...",
    tag: ["reebok", "vintage"],
    slug: "reebok-club-c",
    avatar:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    category: { categoryId: "c3", name: "Sneaker", slug: "sneaker" },
    stock: 60,
    rating: 4.6,
    min_price: 2200000,
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

  const total = MOCK_DB.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = MOCK_DB.slice(startIndex, endIndex);

  return {
    message: "Fetched favourites successfully",
    data: paginatedData,
    pagination: {
      total: total,
      page: page,
      limit: limit,
      totalPages: totalPages > 0 ? totalPages : 1,
    },
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
