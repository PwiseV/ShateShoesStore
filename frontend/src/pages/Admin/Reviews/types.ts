export interface ReviewData {
  id: string;
  reviewCode: string;
  productId: string;
  productName: string;
  customerName: string;
  stars: number;
  reviewContent: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface ReviewData {
  id: string;
  reviewCode: string;
  productId: string;
  productName: string;
  customerName: string;
  stars: number;
  reviewContent: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface ReviewQueryParams {
  search?: string;
  status?: string[];        // ["approved", "rejected"]
  stars?: number[];
  page?: number;
  pageSize?: number;
}

export interface ReviewResponse {
  data: ReviewData[];
  total: number;
  page: number;
  pageSize: number;
}