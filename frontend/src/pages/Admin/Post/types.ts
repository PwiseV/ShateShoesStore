// src/types.ts

// --- ENTITY TYPES ---

export interface Post {
  id: string; // Dùng virtual ID
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  author: string;
  category: string;
  status: "active" | "hidden";
  createdAt: string;
  updatedAt: string;
}

// --- QUERY TYPES ---

export interface PostQueryParams {
  page: number;
  pageSize: number;
  keyword?: string;
  category?: string;
  status?: string;
}

// --- RESPONSE TYPES ---

export interface PostResponse {
  data: Post[];
  total: number;
  page: number;
  pageSize: number;
}

// --- FORM TYPES ---

export interface PostFormData {
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  content: string;
  author: string;
  status: "active" | "hidden";
}
