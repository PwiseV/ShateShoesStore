// services/fakeAdminPostServices.ts

// 1. Cập nhật Interface: Thêm author và slug
export interface Post {
  id: number;
  title: string;
  slug: string; // <-- Mới
  category: string;
  thumbnail?: string;
  content: string;
  author: string; // <-- Mới
  status: "active" | "hidden";
  createdAt: string;
}

export interface PostFilterParams {
  page: number;
  pageSize: number;
  keyword?: string;
  category?: string;
  month?: string;
}

export interface PostResponse {
  data: Post[];
  total: number;
}

// 2. Hàm tiện ích tạo Slug (Copy từ logic bài trước)
const generateSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

// 3. Update Mock Data: Thêm slug và author vào dữ liệu mẫu
let postsData: Post[] = [
  {
    id: 1,
    title: "10 cách phối đồ mùa đông cực chất",
    slug: "10-cach-phoi-do-mua-dong-cuc-chat", // <-- Có slug
    category: "Phối đồ",
    thumbnail: "winter_outfit.jpg",
    content: "Giày không chỉ là phụ kiện giúp bạn di chuyển...",
    author: "Minh Ngọc", // <-- Có tác giả
    status: "active",
    createdAt: "2025-10-15",
  },
  {
    id: 2,
    title: "Xu hướng thời trang Xuân Hè 2025",
    slug: "xu-huong-thoi-trang-xuan-he-2025",
    category: "Xu hướng",
    thumbnail: "summer_trend.jpg",
    content: "Màu sắc chủ đạo năm nay sẽ thiên về pastel...",
    author: "Hoàng Anh",
    status: "hidden",
    createdAt: "2025-11-02",
  },
];

// SERVICES

export const getPosts = (params: PostFilterParams): Promise<PostResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...postsData];
      if (params.keyword) {
        filtered = filtered.filter((p) =>
          p.title.toLowerCase().includes(params.keyword!.toLowerCase())
        );
      }
      if (params.category && params.category !== "All") {
        filtered = filtered.filter((p) => p.category === params.category);
      }
      if (params.month && params.month !== "All") {
        filtered = filtered.filter((p) =>
          p.createdAt.startsWith(params.month!)
        );
      }

      const startIndex = (params.page - 1) * params.pageSize;
      resolve({
        data: filtered.slice(startIndex, startIndex + params.pageSize),
        total: filtered.length,
      });
    }, 500);
  });
};

// Update createPost: Tự động tạo Slug
export const createPost = (
  newPost: Omit<Post, "id" | "createdAt" | "slug">
): Promise<Post> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post: Post = {
        ...newPost,
        id: Date.now(),
        slug: generateSlug(newPost.title), // <-- Tự động tạo slug khi tạo mới
        createdAt: new Date().toISOString().split("T")[0],
      };
      postsData.unshift(post);
      resolve(post);
    }, 500);
  });
};

export const updatePost = (
  id: number,
  updatedData: Partial<Post>
): Promise<Post | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = postsData.findIndex((p) => p.id === id);
      if (index !== -1) {
        // Nếu có sửa title thì sửa cả slug
        let newData = { ...updatedData };
        if (newData.title) {
          newData.slug = generateSlug(newData.title);
        }

        postsData[index] = { ...postsData[index], ...newData };
        resolve(postsData[index]);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

export const deletePost = (id: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      postsData = postsData.filter((p) => p.id !== id);
      resolve(true);
    }, 500);
  });
};

export const updatePostStatus = (
  id: number,
  status: "active" | "hidden"
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = postsData.find((p) => p.id === id);
      if (post) post.status = status;
      resolve(true);
    }, 300);
  });
};
