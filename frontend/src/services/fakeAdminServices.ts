/* ============================
   TYPES
============================ */
type StockState = "in stock" | "low stock" | "out of stock";

export interface OverviewResponse {
  sumCustomers: number;
  balanceAmount: string;
  customerTrend: number;
  balanceTrend: number;
}

export interface NewCustomer {
  id: string;
  username: string;
  email: string;
  avatar?: string | undefined;
  
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  status: StockState;
  avatar?: string | undefined;
}

export interface DayData {
  day: string;
  views: number;
}

export interface CommentItem {
  id: string;
  username: string;
  content: string;
  time: string;
  avatar?: string | undefined;
}

/* ============================
   MOCK DATA
============================ */

const mockOverview: OverviewResponse = {
  sumCustomers: 1337,
  balanceAmount: "256k",
  customerTrend: -5.8,
  balanceTrend: 10.6,
};

const mockNewCustomers: NewCustomer[] = [
  {
    id: "u1",
    username: "minhnguyen",
    email: "minhnguyen@gmail.com",
    avatar: undefined,
  },
  {
    id: "u2",
    username: "linhtran",
    email: "linhtran@gmail.com",
    avatar: undefined,
  },
  {
    id: "u3",
    username: "hoangpham",
    email: "hoangpham@gmail.com",
    avatar: undefined,
  },
  {
    id: "u4",
    username: "thao.le",
    email: "thao.le@gmail.com",
    avatar: undefined,
  },
];

const listProducts: ProductItem[] = [
  {
    id: "s1",
    name: "Nike Air Force 1 '07",
    price: 120,
    status: "in stock",
    avatar: undefined,
  },
  {
    id: "s2",
    name: "Adidas Ultraboost 22",
    price: 180,
    status: "low stock",
    avatar: undefined,
  },
  {
    id: "s3",
    name: "Converse Chuck Taylor All Star",
    price: 65,
    status: "out of stock",
    avatar: undefined,
  },
  {
    id: "s4",
    name: "Puma RS-X Reinvention",
    price: 110,
    status: "in stock",
    avatar: undefined,
  },
  {
    id: "s5",
    name: "New Balance 550",
    price: 130,
    status: "in stock",
    avatar: undefined,
  },
];

const mockProductViews7Days: DayData[] = [
  { day: "Mon", views: 910 },
  { day: "Tue", views: 560 },
  { day: "Wed", views: 480 },
  { day: "Thu", views: 700 },
  { day: "Fri", views: 630 },
  { day: "Sat", views: 900 },
  { day: "Sun", views: 760 },
];

const mockShoeComments: CommentItem[] = [
  {
    id: "c1",
    username: "minhtran",
    content: "Giày mang rất êm, đi cả ngày không bị đau chân.",
    time: "5 minutes ago",
    avatar: undefined,
  },
  {
    id: "c2",
    username: "hoangnguyen",
    content: "Form giày đẹp, đúng size, màu ngoài đời giống hình.",
    time: "30 minutes ago",
    avatar: undefined,
  },
  {
    id: "c3",
    username: "thanhle",
    content: "Chạy bộ khá ổn, đế bám tốt nhưng hơi cứng lúc đầu.",
    time: "2 hours ago",
    avatar: undefined,
  },
  {
    id: "c4",
    username: "anhpham",
    content: "Đóng gói cẩn thận, giao hàng nhanh, rất hài lòng.",
    time: "Yesterday",
    avatar: undefined,
  },
  {
    id: "c5",
    username: "quanghuy",
    content: "Giày đẹp nhưng nên đặt lên nửa size nếu chân bè.",
    time: "2 days ago",
    avatar: undefined,
  },
  {
    id: "c6",
    username: "thutrang",
    content: "Mua cho chồng, anh ấy mang khen êm và nhẹ.",
    time: "3 days ago",
    avatar: undefined,
  },
];

/* ============================
   DASHBOARD APIS (MOCK)
============================ */

// Get dashboard overview
export const getDashboardOverview = async (): Promise<OverviewResponse> => {
  await new Promise((res) => setTimeout(res, 600));
  return mockOverview;
};

// Get new customers today
export const getDashboardNewCustomers = async (): Promise<NewCustomer[]> => {
  await new Promise((res) => setTimeout(res, 600));
  return mockNewCustomers;
};


export const getDashboardPopularProducts = async (): Promise<ProductItem[]> => {
  await new Promise((res) => setTimeout(res, 600));
  return listProducts;
};


export const getDashboardProductViewsLast7Days = async (): Promise<DayData[]> => {
    await new Promise((res) => setTimeout(res, 500));
    return mockProductViews7Days;
};

export const getDashboardComments = async (): Promise<CommentItem[]> => {
    await new Promise((res) => setTimeout(res, 500));
    return mockShoeComments;
};

/* ============================
   ORDERS (MOCK)
============================ */

export interface OrderItemMock {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderMock {
  id: string;
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  total: number;
  paymentMethod: string;
  status: string;
  items?: OrderItemMock[];
}

const mockOrders: OrderMock[] = [
  { id: "1", orderNumber: "ORD001", name: "Phạm Minh Phát", email: "phatminh@gmail.com", phone: "1234567890", address: "X12 khu Ủ, tp HCM", createdAt: "Jun 12,2023", total: 2000000, paymentMethod: "COD", status: "processing", items: [
    { id: "i1", productName: "Nike Jordan 1 Low", sku: "SH01", quantity: 1, price: 1000000, total: 1000000 },
    { id: "i2", productName: "Converse", sku: "SH21", quantity: 1, price: 400000, total: 400000 },
    { id: "i3", productName: "New Balance", sku: "SH31", quantity: 1, price: 600000, total: 600000 },
  ] },
  { id: "2", orderNumber: "ORD002", name: "Nguyễn Văn A", email: "a@gmail.com", phone: "0987654321", address: "Hanoi", createdAt: "Jun 13,2023", total: 1500000, paymentMethod: "Credit card", status: "waitting_approval", items: [
    { id: "i4", productName: "Adidas Ultraboost 22", sku: "SH02", quantity: 2, price: 750000, total: 1500000 },
  ] },
  { id: "3", orderNumber: "ORD003", name: "Trần Thị B", email: "b@gmail.com", phone: "0912345678", address: "Da Nang", createdAt: "Jun 14,2023", total: 500000, paymentMethod: "Paypal", status: "delivered", items: [
    { id: "i5", productName: "Puma RS-X Reinvention", sku: "SH03", quantity: 1, price: 500000, total: 500000 },
  ] },
  { id: "4", orderNumber: "ORD004", name: "Lê Văn C", email: "c@gmail.com", phone: "0909876543", address: "Hai Phong", createdAt: "Jun 15,2023", total: 3000000, paymentMethod: "Banking", status: "shipped", items: [] },
  { id: "5", orderNumber: "ORD005", name: "Phạm Thị D", email: "d@gmail.com", phone: "0934567890", address: "Can Tho", createdAt: "Jun 16,2023", total: 750000, paymentMethod: "COD", status: "processing", items: [] },
  { id: "6", orderNumber: "ORD006", name: "Hoàng Văn E", email: "e@gmail.com", phone: "0945678901", address: "Nha Trang", createdAt: "Jun 17,2023", total: 1200000, paymentMethod: "Credit card", status: "cancelled", items: [] },
  { id: "7", orderNumber: "ORD007", name: "Đặng Thị F", email: "f@gmail.com", phone: "0956789012", address: "Vung Tau", createdAt: "Jun 18,2023", total: 2200000, paymentMethod: "Paypal", status: "waitting_approval", items: [] },
  { id: "8", orderNumber: "ORD008", name: "Trương Văn G", email: "g@gmail.com", phone: "0967890123", address: "Hue", createdAt: "Jun 19,2023", total: 1800000, paymentMethod: "Banking", status: "processing", items: [] },
  { id: "9", orderNumber: "ORD009", name: "Vũ Thị H", email: "h@gmail.com", phone: "0978901234", address: "Quang Ninh", createdAt: "Jun 20,2023", total: 900000, paymentMethod: "COD", status: "delivered", items: [] },
  { id: "10", orderNumber: "ORD010", name: "Phan Văn I", email: "i@gmail.com", phone: "0989012345", address: "Phu Quoc", createdAt: "Jun 21,2023", total: 1600000, paymentMethod: "Credit card", status: "shipped", items: [] },
];

export const getAdminOrders = async (): Promise<OrderMock[]> => {
  await new Promise((res) => setTimeout(res, 400));
  return mockOrders;
};