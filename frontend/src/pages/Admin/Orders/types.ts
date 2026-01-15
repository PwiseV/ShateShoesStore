// --- Entities (Thực thể dữ liệu) ---

export interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number; // Chỉ xem, không sửa
  price: number;
  total: number;
}

export interface OrderData {
  id: string;
  orderNumber: string; // Mã đơn hàng (VD: ORD001)
  name: string; // Tên khách hàng
  email?: string; // Email khách hàng
  phone: string; // Số điện thoại
  address: string; // Địa chỉ giao hàng
  createdAt: string; // Ngày tạo (ISO String: "2023-06-12T10:30:00.000Z")
  total: number; // Tổng tiền
  paymentMethod: "COD" | "Banking"; // "COD" | "Banking" ... (để string cho linh hoạt hoặc enum nếu fix cứng)
  status:
    | "waittingApproval" // Lưu ý: Backend bạn ghi là "waittingApproval" (2 chữ t)
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
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
  minPrice?: number;
  maxPrice?: number;
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
