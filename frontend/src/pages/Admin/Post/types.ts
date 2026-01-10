// Định nghĩa kiểu Post (khớp với service cũ của bạn)
export interface Post {
  id: number;
  title: string;
  category: string;
  thumbnail?: string;
  content: string;
  author: string;
  status: "active" | "hidden";
  createdAt: string; // dạng "YYYY-MM-DD"
}

// Định nghĩa dữ liệu Form
export interface PostFormData {
  title: string;
  category: string;
  thumbnail: string;
  content: string;
  author: string;
  status: "active" | "hidden";
}

// Định nghĩa Params lọc
export interface PostFilterParams {
  keyword: string;
  category: string;
  month: string;
}
