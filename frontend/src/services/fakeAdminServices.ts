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