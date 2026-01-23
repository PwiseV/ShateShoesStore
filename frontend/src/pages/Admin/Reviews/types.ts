export interface ReviewData {
  reviewId: string;
  rating: number;
  title: string;
  content: string;
  order_item_id: number;
  product_id: string;
  userId: string;
  username: string;
  status: ReviewStatus;
  createdAt: Date;
}

export interface ReviewQueryParams {
  keyword?: string;
  status?: string;
  rating?: number;
  page?: number;
  limit?: number;
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

export type ReviewStatus = "pending" | "active" | "hidden";