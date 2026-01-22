/* ============================
   IMPORTS & TYPES
============================ */
import type {
  Order,
  OrderStatus,
  OrderListResponse,
  OrderCounts,
} from "./userHistoryServices";

/* ============================
   MOCK DATA
============================ */
let MOCK_DB: Order[] = [
  // 1. ĐANG VẬN CHUYỂN
  {
    id: "CHT-913742",
    status: "shipping",
    statusLabel: "Đang vận chuyển",
    totalAmount: 239000,
    shippingFee: 30000,
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
    date: "20/10/2025",
    dates: { shipped: "21/10/2025", expected: "25/10/2025" },
    shippingAddress: {
      name: "Tuấn Ngọc",
      phone: "0389183498",
      address: "123 Đường Số 1, Phường Linh Trung, Thủ Đức, TP.HCM",
    },
    products: [
      {
        id: "p1",
        name: "NIKE AIR JORDAN 1",
        variant: "Phân loại: Xanh trắng, 37",
        price: 189000,
        originalPrice: 200000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768232214/variants/jgvv3pcb1rv82ylylf6u.jpg",
      },
    ],
  },
  // 2. THÀNH CÔNG
  {
    id: "CHT-882211",
    status: "delivered",
    statusLabel: "Giao hàng thành công",
    totalAmount: 550000,
    shippingFee: 20000,
    paymentMethod: "Thanh toán khi nhận hàng",
    date: "28/09/2024",
    deliveryDuration: "5 ngày",
    dates: { shipped: "24/09/2024", delivered: "28/09/2024" },
    shippingAddress: {
      name: "Tuấn Ngọc",
      phone: "0389183498",
      address: "Cổng sau kí túc xá khu B, ĐHQG, Thủ Đức, Hồ Chí Minh, Việt Nam",
    },
    products: [
      {
        id: "p3",
        name: "NIKE AIR JORDAN 1",
        variant: "Phân loại: Xanh trắng, 42",
        price: 550000,
        originalPrice: 650000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768164423/variants/wz0bxhbozdv9kxae5dnv.jpg",
      },
    ],
  },
  // 3. CHỜ XÁC NHẬN
  {
    id: "CHT-773322",
    status: "pending",
    statusLabel: "Chờ xác nhận",
    totalAmount: 1250000,
    shippingFee: 0,
    paymentMethod: "Chuyển khoản ngân hàng",
    date: "28/10/2025",
    dates: { expected: "01/11/2025" },
    shippingAddress: {
      name: "Nguyễn Văn A",
      phone: "0909123456",
      address: "456 Lê Văn Việt, Quận 9, TP.HCM",
    },
    products: [
      {
        id: "p4",
        name: "NIKE AIR JORDAN 1",
        variant: "Phân loại: Xanh trắng, 40",
        price: 1250000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768164423/variants/wz0bxhbozdv9kxae5dnv.jpg",
      },
    ],
  },
  // 4. ĐÃ HỦY
  {
    id: "CHT-661100",
    status: "cancelled",
    statusLabel: "Đã hủy",
    totalAmount: 300000,
    shippingFee: 25000,
    paymentMethod: "Ví MoMo",
    date: "15/08/2025",
    dates: {},
    shippingAddress: {
      name: "Trần Thị B",
      phone: "0912345678",
      address: "789 Nguyễn Huệ, Quận 1, TP.HCM",
    },
    products: [
      {
        id: "p6",
        name: "NIKE AIR JORDAN 1",
        variant: "Phân loại: Trắng xanh, 38",
        price: 300000,
        originalPrice: 450000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768236078/variants/riy3vfbs0k7soiidbrnq.jpg",
      },
    ],
  },
  // 5. ĐƠN MỚI (GIAO HÀNG THÀNH CÔNG - 4 SẢN PHẨM)
  {
    id: "CHT-NEW-8899",
    status: "delivered",
    statusLabel: "Giao hàng thành công",
    totalAmount: 4500000,
    shippingFee: 0,
    paymentMethod: "Thanh toán qua thẻ Visa",
    date: "15/11/2025",
    deliveryDuration: "2 ngày",
    dates: { shipped: "16/11/2025", delivered: "18/11/2025" },
    shippingAddress: {
      name: "Trần Văn C",
      phone: "0912345678",
      address: "789 Đường Nguyễn Huệ, Quận 1, TP.HCM, Việt Nam",
    },
    products: [
      {
        id: "p10",
        name: "Adidas Ultraboost 22",
        variant: "Phân loại: Đen, 42",
        price: 1500000,
        originalPrice: 1800000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768164423/variants/wz0bxhbozdv9kxae5dnv.jpg",
      },
      {
        id: "p11",
        name: "Nike Air Force 1",
        variant: "Phân loại: Trắng, 41",
        price: 1200000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768232214/variants/jgvv3pcb1rv82ylylf6u.jpg",
      },
      {
        id: "p12",
        name: "Puma RS-X",
        variant: "Phân loại: Xám, 40",
        price: 1000000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768235813/variants/fdljulagbgtmkunlvy4u.jpg",
      },
      {
        id: "p13",
        name: "New Balance 550",
        variant: "Phân loại: Trắng Xanh, 42",
        price: 800000,
        quantity: 1,
        image:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768236078/variants/riy3vfbs0k7soiidbrnq.jpg",
      },
    ],
  },
];

/* ============================
   USER HISTORY APIS (MOCK)
============================ */

export const getOrders = async (params: {
  page?: number;
  limit?: number;
  status?: OrderStatus | "all";
  search?: string;
}): Promise<OrderListResponse> => {
  await new Promise((res) => setTimeout(res, 600));

  let filtered = [...MOCK_DB];

  if (params.status && params.status !== "all") {
    filtered = filtered.filter((order) => order.status === params.status);
  }

  if (params.search) {
    const term = params.search.toLowerCase();
    filtered = filtered.filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.products.some((p) => p.name.toLowerCase().includes(term)),
    );
  }

  // Phân trang
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  return {
    data: paginatedData,
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / limit),
  };
};

export const getOrderById = async (id: string): Promise<Order> => {
  await new Promise((res) => setTimeout(res, 400));
  const order = MOCK_DB.find((o) => o.id === id);
  if (!order) throw new Error("Order not found");
  return order;
};

export const cancelOrder = async (
  id: string,
  reason?: string,
): Promise<void> => {
  await new Promise((res) => setTimeout(res, 500));
  const index = MOCK_DB.findIndex((o) => o.id === id);
  if (index !== -1) {
    if (MOCK_DB[index].status !== "pending") {
      throw new Error("Cannot cancel this order");
    }
    MOCK_DB[index] = {
      ...MOCK_DB[index],
      status: "cancelled",
      statusLabel: "Đã hủy",
    };
  }
};

export const reOrder = async (id: string): Promise<void> => {
  await new Promise((res) => setTimeout(res, 500));
  console.log(`Re-ordered items from order ${id}`);
};

export const getOrderCounts = async (): Promise<OrderCounts> => {
  await new Promise((res) => setTimeout(res, 300));
  return {
    all: MOCK_DB.length,
    pending: MOCK_DB.filter((o) => o.status === "pending").length,
    shipping: MOCK_DB.filter((o) => o.status === "shipping").length,
    delivered: MOCK_DB.filter((o) => o.status === "delivered").length,
    cancelled: MOCK_DB.filter((o) => o.status === "cancelled").length,
  };
};
