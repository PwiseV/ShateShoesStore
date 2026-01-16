// --- Entities (Thực thể dữ liệu) ---

export interface OrderItem {
  id: string;

  quantity: number;
  price: number;
  subtotal?: number;

  sku?: string;
  productName?: string;

  product?: {
    _id?: string;
    title?: string;
    image?: string;
  };

  variant?: {
    size?: string;
    color?: string;
  };
}

export interface OrderData {
  id: string;
  orderNumber: string;

  name: string;
  phone: string;
  address: string;
  email?: string;

  status: string;
  paymentMethod: string;

  total: number;
  createdAt: string;

  items: OrderItem[];
}

// --- Pagination (Phân trang) ---

export interface PaginationMeta {
  total: number; // Tổng số bản ghi
  page: number; // Trang hiện tại
  limit: number; // Số lượng item/trang
  totalPages: number; // Tổng số trang
}

// --- API Responses (Dữ liệu trả về từ Server) ---

export interface OrderApiResponse {
  data: OrderData[];
  pagination: PaginationMeta;
}

// --- Request DTOs (Dữ liệu gửi lên Server) ---

// 1. Params cho GET (Lọc & Phân trang)
export interface OrderQueryParams {
  page?: number;
  limit?: number;
  keyword?: string; // Tìm theo tên, sđt, mã đơn
  status?: string;
  paymentMethod?: string;
  minTotal?: number;
  maxTotal?: number;
}

// 2. Payload cho PATCH (Cập nhật đơn hàng)
// Dùng Partial để các trường là tùy chọn, nhưng thường khi edit ta gửi object đầy đủ các field cho phép sửa
export interface UpdateOrderPayload {
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  status?: string;
  paymentMethod?: string;
}
