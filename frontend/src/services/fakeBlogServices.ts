/* ============================
   TYPES
============================ */

export interface Product {
  id: number | string;
  name: string;
  image: string;
  price?: number;
}

export interface BlogPost {
  id: number | string;
  title: string;
  summary: string;
  thumbnail: string;
  published_at: string;
}

export interface NewsletterResponse {
  message: string;
}

/* ============================
   MOCK DATA
============================ */

const mockTrendingProducts: Product[] = [
  {
    id: 1,
    name: "MIRA MARY SNEAKER",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
  },
  {
    id: 2,
    name: "Brownie Ballet",
    image:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=500&q=80",
  },
  {
    id: 3,
    name: "Ballet Violet",
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80",
  },
  {
    id: 4,
    name: "Sneaker NxN",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
  },
  {
    id: 5,
    name: "Retro Runner",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80",
  },
  {
    id: 6,
    name: "Classic White",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
  },
];

const mockPosts: BlogPost[] = [
  {
    id: 101,
    title: "Chuyện những đôi giày kể",
    summary:
      "Khám phá xu hướng, bí quyết chọn giày và cảm hứng thời trang dành riêng cho bạn.",
    thumbnail:
      "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&q=80",
    published_at: "Sun September 10th 2025",
  },
  {
    id: 102,
    title: "Mẹo hay cho tín đồ giày đẹp",
    summary: "Tips bảo quản giày luôn mới...",
    thumbnail:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200",
    published_at: "Sun September 10th 2025",
  },
  {
    id: 103,
    title: "Từ đôi giày đến phong cách sống",
    summary: "Phong cách sống tối giản...",
    thumbnail:
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=200",
    published_at: "Sun September 10th 2025",
  },
  {
    id: 104,
    title: "Cập nhật xu hướng giày mới nhất",
    summary: "Xu hướng mùa thu đông năm nay...",
    thumbnail:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=200",
    published_at: "Sun September 10th 2025",
  },
];

/* ============================
   BLOG APIS (MOCK)
============================ */

// Get Trending Products
export const getTrendingProducts = async (
  limit: number = 6,
): Promise<Product[]> => {
  await new Promise((res) => setTimeout(res, 800));
  return mockTrendingProducts.slice(0, limit);
};

// Get Latest Blog Posts
export const getLatestPosts = async (
  limit: number = 4,
): Promise<BlogPost[]> => {
  await new Promise((res) => setTimeout(res, 1000));
  return mockPosts.slice(0, limit);
};

// Subscribe Newsletter
export const subscribeNewsletter = async (
  email: string,
): Promise<NewsletterResponse> => {
  await new Promise((res) => setTimeout(res, 1500));

  if (!email.includes("@")) {
    throw new Error("Email không hợp lệ.");
  }

  return {
    message: "Đăng ký nhận tin thành công! Hãy kiểm tra hộp thư của bạn.",
  };
};
