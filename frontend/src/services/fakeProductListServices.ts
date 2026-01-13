import api from "./axios";

/* ============================
   TYPES (Cấu trúc UI cần)
============================ */
export interface Product {
  id: string;
  name: string;
  priceVnd: number;
  rating: number;
  image: string;
}

export type Category = string;

/* ============================
   MOCK DATA (Giả lập DB giống hệt cấu trúc PDF)
============================ */
const RAW_DB_PRODUCTS = [
  {
    id: "p1",
    title: "Giày Tây Oxford Da Trơn",
    avatar:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    rating: 5.0, // Backend thiếu -> FE tự thêm giả
    sizes: [{ colors: [{ price: 399000 }] }], // Giá nằm sâu
  },
  {
    id: "p2",
    title: "MIRA MARY SNEAKER",
    avatar:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    sizes: [{ colors: [{ price: 349000 }] }],
  },
  {
    id: "p3",
    title: "Moca Miu Loafer",
    avatar:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    sizes: [{ colors: [{ price: 552000 }] }],
  },
  {
    id: "p4",
    title: "Giày D-I-E-SEL Heels",
    avatar:
      "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    sizes: [{ colors: [{ price: 580000 }] }],
  },
  {
    id: "p5",
    title: "Giày Shizuka Flat",
    avatar:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    sizes: [{ colors: [{ price: 380000 }] }],
  },
  {
    id: "p6",
    title: "Brownie Ballet",
    avatar:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    sizes: [{ colors: [{ price: 322000 }] }],
  },
  {
    id: "p7",
    title: "Classic White",
    avatar:
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    sizes: [{ colors: [{ price: 450000 }] }],
  },
];

const mockCategories: Category[] = [
  "Giày thể thao",
  "Mary Jane",
  "Boots",
  "Khuyến mãi",
  "Giày cao gót",
  "Loafer",
  "Giày búp bê",
  "Sandal",
  "Phụ kiện",
];

/* ============================
   FAKE API LOGIC (Tự xử lý những phần Backend thiếu)
============================ */

export const getAllProducts = async (params?: {
  sort?: string;
}): Promise<Product[]> => {
  await new Promise((res) => setTimeout(res, 600)); // Delay giả

  // 1. Map dữ liệu trước (Làm phẳng cấu trúc)
  let mappedProducts = RAW_DB_PRODUCTS.map((item) => ({
    id: item.id,
    name: item.title,
    // Logic: Lấy giá của màu đầu tiên, size đầu tiên làm giá hiển thị
    priceVnd: item.sizes?.[0]?.colors?.[0]?.price || 0,
    rating: item.rating,
    image: item.avatar,
  }));

  // 2. Xử lý Sắp xếp (Backend thiếu -> FE tự làm giả)
  if (params?.sort === "priceAsc") {
    mappedProducts.sort((a, b) => a.priceVnd - b.priceVnd);
  } else if (params?.sort === "priceDesc") {
    mappedProducts.sort((a, b) => b.priceVnd - a.priceVnd);
  }

  return mappedProducts;
};

export const getAllCategories = async (): Promise<Category[]> => {
  await new Promise((res) => setTimeout(res, 400));
  return mockCategories;
};

export const getProductById = async (
  id: string
): Promise<Product | undefined> => {
  await new Promise((res) => setTimeout(res, 300));
  const found = RAW_DB_PRODUCTS.find((p) => p.id === id);
  if (!found) return undefined;

  return {
    id: found.id,
    name: found.title,
    priceVnd: found.sizes?.[0]?.colors?.[0]?.price || 0,
    rating: found.rating,
    image: found.avatar,
  };
};
