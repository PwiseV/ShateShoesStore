export interface ReviewData {
  id: string;
  review_id: number;
  rating: number;
  title: string;
  content: string;
  order_item_id: number;
  product_id: number;
  product_name: string;
  user_id: number;
  username: string;
  status: ReviewStatus;
  created_at: Date;
}

export interface ReviewQueryParams {
  search?: string;
  status?: string[];
  rating?: number[];
  page?: number;
  pageSize?: number;
}

export interface ReviewResponse {
  data: ReviewData[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type ReviewStatus = "pending" | "approved" | "rejected";