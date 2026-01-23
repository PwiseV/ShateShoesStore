import type {
  Order,
  OrderListResponse,
  OrderCounts,
} from "./userHistoryServices";

/* ============================
   MOCK DATA
============================ */
let MOCK_DB: Order[] = [
  // --- DỮ LIỆU CŨ ---
  {
    orderId: "6972afa20ffa374910ac1777",
    orderNumber: "ORD-1769123746966",
    status: "pending",
    total: 30000,
    name: "GowL",
    phone: "12345678",
    address: "1234 võ văn kiệt, phường 20, quận 17, hồ chí minh",
    shippingFee: 30000,
    shippingDuration: 5,
    fromAddress: "77 Võ Văn Kiệt, Bình Tân, TP Hồ Chí Minh, Việt Nam",
    paymentMethod: "COD",
    createdAt: "2026-01-22T23:15:46.967Z",
    arrivedAt: "2026-01-27T23:15:46.967Z",
    items: [
      {
        orderItemId: "6972afa30ffa374910ac1779",
        quantity: 1,
        price: 20000,
        variantId: "69729be32ac2736863f41e69",
        size: "37",
        color: "Đen",
        productId: "695d9d4ec96f36869d777056",
        title: "Adidas Ultraboost 22 Running",
        code: "SHOE-AD-003",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768168459/products/hvflmamxipoooz7kqmti.png",
      },
    ],
  },
  {
    orderId: "6972b5e4ffd02177710f0a93",
    orderNumber: "ORD-1769125348401",
    status: "shipped",
    total: 1980000,
    name: "nguyễn thị test",
    phone: "12345678",
    address: "1234 võ văn kiệt, phường 20, quận 17, hồ chí minh",
    shippingFee: 30000,
    shippingDuration: 5,
    fromAddress: "77 Võ Văn Kiệt, Bình Tân, TP Hồ Chí Minh, Việt Nam",
    paymentMethod: "COD",
    createdAt: "2026-01-22T23:42:28.403Z",
    arrivedAt: "2026-01-27T23:42:28.403Z",
    items: [
      {
        orderItemId: "6972b5e4ffd02177710f0a95",
        quantity: 1,
        price: 3900000,
        variantId: "69641698d8c86a59197b56cd",
        size: "42",
        color: "Black",
        productId: "695d9cc5c96f36869d77704c",
        title: "Nike Air Jordan 1 Retro High xiu đẹp",
        code: "SHOE-NK-001",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768168732/products/wqgylhs8jzfio7krastf.png",
      },
    ],
  },

  // --- DỮ LIỆU MỚI THÊM ---

  // 1. Giao thành công - 1 sản phẩm
  {
    orderId: "ORD-DEL-1-001",
    orderNumber: "ORD-SUCCESS-001",
    status: "delivered",
    total: 1500000,
    name: "Trần Văn A",
    phone: "0901234567",
    address: "123 Lê Lợi, Quận 1, TP.HCM",
    shippingFee: 0,
    shippingDuration: 2,
    fromAddress: "Kho Tổng TP.HCM",
    paymentMethod: "Banking",
    createdAt: "2025-11-10T10:00:00.000Z",
    arrivedAt: "2025-11-12T14:30:00.000Z",
    items: [
      {
        orderItemId: "ITEM-DEL-1",
        quantity: 1,
        price: 1500000,
        variantId: "VAR-001",
        size: "40",
        color: "Trắng",
        productId: "PROD-001",
        title: "Nike Air Force 1 '07",
        code: "NK-AF1",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768232214/variants/jgvv3pcb1rv82ylylf6u.jpg",
      },
    ],
  },

  // 2. Đã hủy - 1 sản phẩm
  {
    orderId: "ORD-CAN-1-002",
    orderNumber: "ORD-CANCEL-002",
    status: "cancelled",
    total: 800000,
    name: "Nguyễn Thị B",
    phone: "0909876543",
    address: "456 Nguyễn Trãi, Quận 5, TP.HCM",
    shippingFee: 20000,
    shippingDuration: 0,
    fromAddress: "Kho Tổng TP.HCM",
    paymentMethod: "COD",
    createdAt: "2025-11-15T08:00:00.000Z",
    arrivedAt: "",
    items: [
      {
        orderItemId: "ITEM-CAN-1",
        quantity: 1,
        price: 800000,
        variantId: "VAR-002",
        size: "38",
        color: "Đỏ",
        productId: "PROD-002",
        title: "Vans Old Skool Classic",
        code: "VANS-OS",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768235813/variants/fdljulagbgtmkunlvy4u.jpg",
      },
    ],
  },

  // 3. Giao thành công - 4 sản phẩm
  {
    orderId: "ORD-DEL-4-003",
    orderNumber: "ORD-SUCCESS-MULTI",
    status: "delivered",
    total: 5500000,
    name: "Lê Văn C",
    phone: "0912345678",
    address: "789 Cách Mạng Tháng 8, Quận 10, TP.HCM",
    shippingFee: 0,
    shippingDuration: 3,
    fromAddress: "Kho Tổng TP.HCM",
    paymentMethod: "Banking",
    createdAt: "2025-10-20T09:00:00.000Z",
    arrivedAt: "2025-10-23T16:00:00.000Z",
    items: [
      {
        orderItemId: "ITEM-DEL-4-1",
        quantity: 1,
        price: 2000000,
        variantId: "VAR-003",
        size: "41",
        color: "Đen",
        productId: "PROD-003",
        title: "Adidas Ultraboost 22",
        code: "AD-UB22",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768164423/variants/wz0bxhbozdv9kxae5dnv.jpg",
      },
      {
        orderItemId: "ITEM-DEL-4-2",
        quantity: 1,
        price: 1500000,
        variantId: "VAR-004",
        size: "42",
        color: "Xanh",
        productId: "PROD-004",
        title: "Nike Pegasus 40",
        code: "NK-PG40",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768232214/variants/jgvv3pcb1rv82ylylf6u.jpg",
      },
      {
        orderItemId: "ITEM-DEL-4-3",
        quantity: 1,
        price: 1200000,
        variantId: "VAR-005",
        size: "40",
        color: "Trắng",
        productId: "PROD-005",
        title: "Converse Chuck 70",
        code: "CV-C70",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768236078/variants/riy3vfbs0k7soiidbrnq.jpg",
      },
      {
        orderItemId: "ITEM-DEL-4-4",
        quantity: 1,
        price: 800000,
        variantId: "VAR-006",
        size: "43",
        color: "Xám",
        productId: "PROD-006",
        title: "New Balance 574",
        code: "NB-574",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768172712/variants/rfgnmu1c59fuupwete0o.jpg",
      },
    ],
  },

  // 4. Chờ xác nhận - 4 sản phẩm
  {
    orderId: "ORD-PEN-4-004",
    orderNumber: "ORD-PENDING-MULTI",
    status: "pending",
    total: 4200000,
    name: "Phạm Thị D",
    phone: "0933445566",
    address: "321 Điện Biên Phủ, Bình Thạnh, TP.HCM",
    shippingFee: 50000,
    shippingDuration: 4,
    fromAddress: "Kho Tổng Hà Nội",
    paymentMethod: "COD",
    createdAt: "2025-12-01T11:00:00.000Z",
    arrivedAt: "",
    items: [
      {
        orderItemId: "ITEM-PEN-4-1",
        quantity: 2,
        price: 1000000,
        variantId: "VAR-007",
        size: "39",
        color: "Hồng",
        productId: "PROD-007",
        title: "Puma Cali Dream",
        code: "PM-CD",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768235813/variants/fdljulagbgtmkunlvy4u.jpg",
      },
      {
        orderItemId: "ITEM-PEN-4-2",
        quantity: 1,
        price: 2200000,
        variantId: "VAR-008",
        size: "40",
        color: "Đen/Trắng",
        productId: "PROD-008",
        title: "Nike Dunk Low Retro",
        code: "NK-DL",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768164423/variants/wz0bxhbozdv9kxae5dnv.jpg",
      },
      {
        orderItemId: "ITEM-PEN-4-3",
        quantity: 1,
        price: 500000,
        variantId: "VAR-009",
        size: "L",
        color: "Đen",
        productId: "PROD-009",
        title: "Vớ Nike Cổ Cao (Combo 3)",
        code: "NK-SOCK",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768168732/products/wqgylhs8jzfio7krastf.png",
      },
      {
        orderItemId: "ITEM-PEN-4-4",
        quantity: 1,
        price: 500000,
        variantId: "VAR-010",
        size: "M",
        color: "Trắng",
        productId: "PROD-010",
        title: "Vệ Sinh Giày Crep Protect",
        code: "ACC-CREP",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768232214/variants/jgvv3pcb1rv82ylylf6u.jpg",
      },
    ],
  },

  // 5. Đã hủy - 4 sản phẩm
  {
    orderId: "ORD-CAN-4-005",
    orderNumber: "ORD-CANCEL-MULTI",
    status: "cancelled",
    total: 3000000,
    name: "Hoàng Văn E",
    phone: "0988776655",
    address: "654 Hậu Giang, Quận 6, TP.HCM",
    shippingFee: 0,
    shippingDuration: 0,
    fromAddress: "Kho Tổng TP.HCM",
    paymentMethod: "Banking",
    createdAt: "2025-11-20T14:00:00.000Z",
    arrivedAt: "",
    items: [
      {
        orderItemId: "ITEM-CAN-4-1",
        quantity: 1,
        price: 1500000,
        variantId: "VAR-011",
        size: "41",
        color: "Xanh Navy",
        productId: "PROD-011",
        title: "Asics Gel-Kayano 29",
        code: "AS-GK29",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768172712/variants/rfgnmu1c59fuupwete0o.jpg",
      },
      {
        orderItemId: "ITEM-CAN-4-2",
        quantity: 1,
        price: 800000,
        variantId: "VAR-012",
        size: "42",
        color: "Nâu",
        productId: "PROD-012",
        title: "Timberland 6-Inch Boot",
        code: "TBL-BT",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768236078/variants/riy3vfbs0k7soiidbrnq.jpg",
      },
      {
        orderItemId: "ITEM-CAN-4-3",
        quantity: 1,
        price: 400000,
        variantId: "VAR-013",
        size: "Free",
        color: "Đen",
        productId: "PROD-013",
        title: "Dây Giày Dẹt",
        code: "ACC-LACE",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768168459/products/hvflmamxipoooz7kqmti.png",
      },
      {
        orderItemId: "ITEM-CAN-4-4",
        quantity: 1,
        price: 300000,
        variantId: "VAR-014",
        size: "Free",
        color: "Không màu",
        productId: "PROD-014",
        title: "Xịt Khử Mùi Giày",
        code: "ACC-SPRAY",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768232214/variants/jgvv3pcb1rv82ylylf6u.jpg",
      },
    ],
  },

  // 6. Đang vận chuyển - 4 sản phẩm
  {
    orderId: "ORD-SHIP-4-006",
    orderNumber: "ORD-SHIPPING-MULTI",
    status: "shipped",
    total: 2800000,
    name: "Vũ Thị F",
    phone: "0966554433",
    address: "987 Phạm Văn Đồng, Thủ Đức, TP.HCM",
    shippingFee: 35000,
    shippingDuration: 3,
    fromAddress: "Kho Tổng Đà Nẵng",
    paymentMethod: "COD",
    createdAt: "2025-12-05T08:30:00.000Z",
    arrivedAt: "2025-12-08T17:00:00.000Z",
    items: [
      {
        orderItemId: "ITEM-SHIP-4-1",
        quantity: 1,
        price: 1200000,
        variantId: "VAR-015",
        size: "38",
        color: "Hồng Phấn",
        productId: "PROD-015",
        title: "Nike Air Max 90",
        code: "NK-AM90",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768235813/variants/fdljulagbgtmkunlvy4u.jpg",
      },
      {
        orderItemId: "ITEM-SHIP-4-2",
        quantity: 1,
        price: 900000,
        variantId: "VAR-016",
        size: "39",
        color: "Trắng",
        productId: "PROD-016",
        title: "Reebok Club C 85",
        code: "RB-CC85",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768164423/variants/wz0bxhbozdv9kxae5dnv.jpg",
      },
      {
        orderItemId: "ITEM-SHIP-4-3",
        quantity: 1,
        price: 500000,
        variantId: "VAR-017",
        size: "Free",
        color: "Xanh",
        productId: "PROD-017",
        title: "Balo Adidas Classic",
        code: "ACC-BAG",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768232214/variants/jgvv3pcb1rv82ylylf6u.jpg",
      },
      {
        orderItemId: "ITEM-SHIP-4-4",
        quantity: 1,
        price: 200000,
        variantId: "VAR-018",
        size: "Free",
        color: "Đen",
        productId: "PROD-018",
        title: "Mũ Lưỡi Trai Nike",
        code: "ACC-CAP",
        avatar:
          "https://res.cloudinary.com/dvh9n5dtf/image/upload/v1768168732/products/wqgylhs8jzfio7krastf.png",
      },
    ],
  },
];

/* ============================
   FAKE API IMPLEMENTATION
============================ */

export const getOrders = async (params: {
  status?: string;
  search?: string;
}): Promise<OrderListResponse> => {
  await new Promise((res) => setTimeout(res, 600));

  let filtered = [...MOCK_DB];

  // Mapping status frontend (shipping) sang backend (shipped)
  if (params.status && params.status !== "all") {
    let searchStatus = params.status;
    if (params.status === "shipping") searchStatus = "shipped";

    filtered = filtered.filter((order) => order.status === searchStatus);
  }

  if (params.search) {
    const term = params.search.toLowerCase();
    filtered = filtered.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(term) ||
        order.items.some((p) => p.title.toLowerCase().includes(term)),
    );
  }

  return {
    data: filtered,
  };
};

export const getOrderById = async (id: string): Promise<Order> => {
  await new Promise((res) => setTimeout(res, 400));
  const order = MOCK_DB.find((o) => o.orderId === id);
  if (!order) throw new Error("Order not found");
  return order;
};

export const cancelOrder = async (id: string): Promise<void> => {
  await new Promise((res) => setTimeout(res, 500));
  const index = MOCK_DB.findIndex((o) => o.orderId === id);
  if (index !== -1) {
    MOCK_DB[index] = {
      ...MOCK_DB[index],
      status: "cancelled",
    };
  }
};

export const getOrderCounts = async (): Promise<OrderCounts> => {
  await new Promise((res) => setTimeout(res, 300));
  return {
    all: MOCK_DB.length,
    pending: MOCK_DB.filter((o) =>
      ["pending", "paid", "processing"].includes(o.status),
    ).length,
    shipping: MOCK_DB.filter((o) => o.status === "shipped").length,
    delivered: MOCK_DB.filter((o) => o.status === "delivered").length,
    cancelled: MOCK_DB.filter((o) => o.status === "cancelled").length,
  };
};

export const reOrder = async (id: string): Promise<void> => {
  // Mock reorder
};
