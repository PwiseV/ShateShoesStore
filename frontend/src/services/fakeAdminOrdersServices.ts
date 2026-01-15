import type {
  OrderApiResponse,
  OrderData,
  OrderQueryParams,
  UpdateOrderPayload,
} from "../pages/Admin/Orders/types";

// --- DỮ LIỆU MẪU (MOCK DATA) ---
const mockOrders: OrderData[] = [
  {
    id: "1",
    orderNumber: "ORD001",
    name: "Nguyễn Văn A",
    phone: "0901234567",
    email: "a@gmail.com",
    address: "123 Đường Láng, Hà Nội",
    createdAt: "2023-10-25T08:30:00.000Z",
    paymentMethod: "COD",
    status: "waittingApproval", // Status này cho phép sửa
    total: 1500000,
    items: [
      {
        id: "i1",
        productName: "Nike Jordan 1 Low",
        sku: "NK01",
        quantity: 1,
        price: 1500000,
        total: 1500000,
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD002",
    name: "Trần Thị B",
    phone: "0912345678",
    email: "b@gmail.com",
    address: "456 Điện Biên Phủ, TP.HCM",
    createdAt: "2023-10-24T14:20:00.000Z",
    paymentMethod: "Banking",
    status: "processing", // Status này cho phép sửa
    total: 2500000,
    items: [
      {
        id: "i2",
        productName: "Adidas Ultraboost",
        sku: "AD02",
        quantity: 1,
        price: 2000000,
        total: 2000000,
      },
      {
        id: "i3",
        productName: "Vớ Nike",
        sku: "AC01",
        quantity: 2,
        price: 250000,
        total: 500000,
      },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD003",
    name: "Lê Văn C",
    phone: "0987654321",
    email: "c@gmail.com",
    address: "789 Nguyễn Văn Linh, Đà Nẵng",
    createdAt: "2023-10-20T09:00:00.000Z",
    paymentMethod: "COD",
    status: "shipped", // Status này KHÔNG cho phép sửa (theo logic UI)
    total: 500000,
    items: [
      {
        id: "i4",
        productName: "Áo Thun Basic",
        sku: "TS01",
        quantity: 2,
        price: 250000,
        total: 500000,
      },
    ],
  },
  {
    id: "4",
    orderNumber: "ORD004",
    name: "Phạm Thị D",
    phone: "0999888777",
    email: "d@gmail.com",
    address: "12 Hùng Vương, Cần Thơ",
    createdAt: "2023-10-18T16:45:00.000Z",
    paymentMethod: "Banking",
    status: "delivered", // KHÔNG cho phép sửa
    total: 3200000,
    items: [
      {
        id: "i5",
        productName: "Converse Chuck 70",
        sku: "CV01",
        quantity: 2,
        price: 1600000,
        total: 3200000,
      },
    ],
  },
  {
    id: "5",
    orderNumber: "ORD005",
    name: "Hoàng Văn E",
    phone: "0933444555",
    email: "e@gmail.com",
    address: "99 Lê Lợi, Huế",
    createdAt: "2023-10-15T10:10:00.000Z",
    paymentMethod: "COD",
    status: "cancelled", // KHÔNG cho phép sửa
    total: 0,
    items: [
      {
        id: "i6",
        productName: "Puma RS-X",
        sku: "PM01",
        quantity: 1,
        price: 1200000,
        total: 1200000,
      },
    ],
  },
  // // Tạo thêm data giả để test phân trang
  // ...Array.from({ length: 15 }).map((_, i) => ({
  //   id: `${i + 6}`,
  //   orderNumber: `ORD00${i + 6}`,
  //   name: `Khách hàng ${i + 6}`,
  //   phone: `09000000${i}`,
  //   email: `customer${i}@mail.com`,
  //   address: `Địa chỉ mẫu ${i}`,
  //   createdAt: new Date().toISOString(),
  //   paymentMethod: i % 2 === 0 ? "COD" : "Banking",
  //   status: [
  //     "waittingApproval",
  //     "processing",
  //     "shipped",
  //     "delivered",
  //     "cancelled",
  //   ][i % 5] as any,
  //   total: (i + 1) * 500000,
  //   items: [],
  // })),
];

// Giả lập độ trễ mạng (Network Delay)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- SERVICE FUNCTION ---

export const getAdminOrdersMock = async (
  params: OrderQueryParams
): Promise<OrderApiResponse> => {
  await delay(800); // Đợi 0.8s cho giống thật

  let filtered = [...mockOrders];

  // 1. Lọc theo Keyword (Tên, SĐT, Mã đơn)
  if (params.keyword) {
    const lowerKey = params.keyword.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        o.name.toLowerCase().includes(lowerKey) ||
        o.phone.includes(lowerKey) ||
        o.orderNumber.toLowerCase().includes(lowerKey)
    );
  }

  // 2. Lọc theo Status
  if (params.status) {
    filtered = filtered.filter((o) => o.status === params.status);
  }

  // 3. Lọc theo Payment Method
  if (params.paymentMethod) {
    filtered = filtered.filter((o) => o.paymentMethod === params.paymentMethod);
  }

  // 4. Lọc theo Price Range
  if (params.minPrice !== undefined && params.maxPrice !== undefined) {
    filtered = filtered.filter(
      (o) => o.total >= params.minPrice! && o.total <= params.maxPrice!
    );
  }

  // 5. Phân trang
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = filtered.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    },
  };
};

export const updateAdminOrderMock = async (
  id: string,
  payload: UpdateOrderPayload
): Promise<{ message: string; data: OrderData }> => {
  await delay(600); // Đợi 0.6s

  const index = mockOrders.findIndex((o) => o.id === id);
  if (index === -1) {
    throw new Error("Order not found (Mock)");
  }

  // Cập nhật dữ liệu trong mảng mock (Giả lập update DB)
  const originalOrder = mockOrders[index];

  const updatedOrder = {
    ...originalOrder,
    ...payload,
    // Lưu ý: items trong payload gửi lên chỉ có id, quantity.
    // Nhưng vì logic mới không cho sửa items, ta giữ nguyên items gốc của mock
    items: originalOrder.items,
  };

  // Lưu lại vào mảng gốc (để khi tắt modal mở lại thấy thay đổi)
  mockOrders[index] = updatedOrder as OrderData;

  return {
    message: "Cập nhật thành công (Mock)",
    data: updatedOrder as OrderData,
  };
};
