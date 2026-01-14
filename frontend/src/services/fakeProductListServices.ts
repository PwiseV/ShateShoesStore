import api from "./axios";

/* ============================
   TYPES
============================ */
export interface ChildCategory {
  id: string;
  name: string;
}

export interface ParentCategory {
  id: string;
  name: string;
  category: ChildCategory[];
}

export interface Product {
  id: string;
  name: string;
  priceVnd: number;
  rating: number;
  image: string;
  category?: {
    id?: string;
    name: string;
  };
}

/* ============================
   MOCK DATA (Giữ nguyên như cũ)
============================ */
// ... (Bạn giữ nguyên phần MOCK_CATEGORIES_TREE và RAW_DB_PRODUCTS) ...

const MOCK_CATEGORIES_TREE: ParentCategory[] = [
  {
    id: "cat_1",
    name: "Giày Nam",
    category: [
      { id: "sub_1_1", name: "Giày Tây" },
      { id: "sub_1_2", name: "Giày Lười" },
      { id: "sub_1_3", name: "Sneaker" },
      { id: "sub_1_4", name: "Sandal Nam" },
    ],
  },
  {
    id: "cat_2",
    name: "Giày Nữ",
    category: [
      { id: "sub_2_1", name: "Giày Cao Gót" },
      { id: "sub_2_2", name: "Giày Búp Bê" },
      { id: "sub_2_3", name: "Giày Boot" },
      { id: "sub_2_4", name: "Mary Jane" },
    ],
  },
  {
    id: "cat_3",
    name: "Khuyến Mãi",
    category: [
      { id: "sub_3_1", name: "Giảm giá 50%" },
      { id: "sub_3_2", name: "Mua 1 tặng 1" },
    ],
  },
];

const RAW_DB_PRODUCTS = [
  {
    id: "p1",
    title: "Giày Tây Oxford Da Trơn",
    avatar:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    category: { name: "Giày Tây" },
    sizes: [{ colors: [{ price: 399000 }] }],
  },
  {
    id: "p2",
    title: "MIRA MARY SNEAKER",
    avatar:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    category: { name: "Sneaker" },
    sizes: [{ colors: [{ price: 349000 }] }],
  },
  {
    id: "p3",
    title: "Moca Miu Loafer",
    avatar:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    category: { name: "Giày Lười" },
    sizes: [{ colors: [{ price: 552000 }] }],
  },
  {
    id: "p4",
    title: "Giày D-I-E-SEL Heels",
    avatar:
      "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    category: { name: "Giày Cao Gót" },
    sizes: [{ colors: [{ price: 580000 }] }],
  },
  {
    id: "p5",
    title: "Giày Shizuka Flat",
    avatar:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80",
    rating: 5.0,
    category: { name: "Giày Búp Bê" },
    sizes: [{ colors: [{ price: 380000 }] }],
  },
  {
    id: "p6",
    title: "Brownie Ballet",
    avatar:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    category: { name: "Giày Búp Bê" },
    sizes: [{ colors: [{ price: 322000 }] }],
  },
  {
    id: "p7",
    title: "Classic White",
    avatar:
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    category: { name: "Sneaker" },
    sizes: [{ colors: [{ price: 450000 }] }],
  },
];

/* ============================
   FAKE API LOGIC (Chỉ Filter, KHÔNG Sort)
============================ */

export const getAllProducts = async (params?: {
  category?: string;
  keyword?: string;
  // sort?: string; -> Bỏ sort ở backend
}): Promise<Product[]> => {
  await new Promise((res) => setTimeout(res, 600)); // Delay giả

  // 1. Map dữ liệu
  let result = RAW_DB_PRODUCTS.map((item) => ({
    id: item.id,
    name: item.title,
    priceVnd: item.sizes?.[0]?.colors?.[0]?.price || 0,
    rating: item.rating,
    image: item.avatar,
    category: item.category,
  }));

  // 2. BACKEND FILTERING (Chỉ lọc)
  if (params?.category) {
    result = result.filter((p) => p.category?.name === params.category);
  }

  if (params?.keyword) {
    const k = params.keyword.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(k));
  }

  // KHÔNG CÓ SORT Ở ĐÂY -> Trả về kết quả ngẫu nhiên hoặc theo ID
  return result;
};

// ... (Giữ nguyên các hàm categories, getProductById)
export const getAllCategories = async (): Promise<ParentCategory[]> => {
  await new Promise((res) => setTimeout(res, 400));
  return MOCK_CATEGORIES_TREE;
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
    category: found.category,
  };
};
