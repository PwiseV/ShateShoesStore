import type { PaginatedBlogResponse } from "./blogListServices";
import type { BlogPost } from "./blogServices";

/* ============================
   MOCK DATA
============================ */

// Tạo dữ liệu giả: 15 bài viết để test phân trang (Trang 1: 10 bài, Trang 2: 5 bài)
const MOCK_ALL_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Mẹo hay cho tín đồ giày đẹp",
    summary:
      "Những bí quyết đơn giản giúp đôi giày của bạn luôn bền đẹp như mới.",
    thumbnail:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
    published_at: "Sun Sep 10 2025",
  },
  {
    id: 2,
    title: "Từ đôi giày đến phong cách sống",
    summary: "Phong cách chọn giày nói lên điều gì về cá tính của bạn?",
    thumbnail:
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500&q=80",
    published_at: "Sun Sep 10 2025",
  },
  {
    id: 3,
    title: "Cập nhật xu hướng giày mới nhất",
    summary:
      "Điểm qua những mẫu giày đang làm mưa làm gió trong mùa thu đông năm nay.",
    thumbnail:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=500&q=80",
    published_at: "Sun Sep 10 2025",
  },
  // Tạo thêm các bài viết giả lập bằng vòng lặp để đủ số lượng test
  ...Array.from({ length: 12 }).map((_, index) => ({
    id: index + 4,
    title: `Bài viết mẫu số ${index + 4} - Xu hướng Sneaker 2026`,
    summary: `Đây là nội dung tóm tắt cho bài viết số ${index + 4}. Cập nhật những thông tin mới nhất về thời trang giày dép.`,
    thumbnail: `https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80&sig=${index}`,
    published_at: "Mon Oct 12 2025",
  })),
];

/* ============================
   BLOG LIST APIS (MOCK)
============================ */

export const getBlogList = async (
  page: number = 1,
  limit: number = 10,
  search: string = "",
): Promise<PaginatedBlogResponse> => {
  // Giả lập độ trễ mạng 0.8s
  await new Promise((res) => setTimeout(res, 800));

  // 1. Logic Tìm kiếm (Filter)
  let filteredData = MOCK_ALL_POSTS;
  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredData = MOCK_ALL_POSTS.filter((post) =>
      post.title.toLowerCase().includes(lowerSearch),
    );
  }

  // 2. Logic Phân trang (Pagination)
  const total = filteredData.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: total,
    currentPage: page,
    totalPages: totalPages > 0 ? totalPages : 1, // Đảm bảo ít nhất là 1 trang
  };
};
