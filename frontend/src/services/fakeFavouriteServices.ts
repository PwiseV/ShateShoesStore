import type {
  PaginatedFavouriteResponse,
  FavouriteProduct,
} from "./favouriteServices";

/* ============================
   MOCK DATABASE (Giả lập DB)
============================ */
// Lưu biến này bên ngoài hàm để giữ trạng thái khi thao tác (xóa/thêm)
let MOCK_DB: FavouriteProduct[] = [
  {
    id: "1",
    name: "Nike Air Force 1 '07",
    priceVnd: 3500000,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Adidas Ultraboost Light",
    priceVnd: 4200000,
    image:
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&q=80",
    rating: 4.9,
  },
  {
    id: "3",
    name: "New Balance 530 Retro",
    priceVnd: 2800000,
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Converse Chuck 70 High",
    priceVnd: 1900000,
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&q=80",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Vans Old Skool Classic",
    priceVnd: 1600000,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    rating: 4.5,
  },
  {
    id: "6",
    name: "Puma Suede Classic XXI",
    priceVnd: 2100000,
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    rating: 4.4,
  },
  {
    id: "7",
    name: "Reebok Club C 85 Vintage",
    priceVnd: 2300000,
    image:
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&q=80",
    rating: 4.3,
  },
  {
    id: "8",
    name: "Asics Gel-Kayano 14",
    priceVnd: 3800000,
    image:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    rating: 4.8,
  },
];

/* ============================
   FAKE SERVICES IMPLEMENTATION
============================ */

// 1. Lấy danh sách (Có phân trang)
export const getFavouriteList = async (
  page: number = 1,
  limit: number = 6,
): Promise<PaginatedFavouriteResponse> => {
  await new Promise((res) => setTimeout(res, 500));

  const total = MOCK_DB.length;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = MOCK_DB.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: total,
    currentPage: page,
    totalPages: totalPages > 0 ? totalPages : 1,
  };
};

// 2. Xóa khỏi yêu thích
export const removeFromFavourite = async (
  productId: string | number,
): Promise<void> => {
  await new Promise((res) => setTimeout(res, 300));

  MOCK_DB = MOCK_DB.filter((item) => item.id !== productId.toString());

  console.log(
    `[FakeService] Removed product ${productId}. Remaining: ${MOCK_DB.length}`,
  );
};

// 3. Thêm vào yêu thích (Để test nếu cần)
export const addToFavourite = async (
  productId: string | number,
): Promise<void> => {
  await new Promise((res) => setTimeout(res, 300));
  console.log(`[FakeService] Added product ${productId}`);
};
