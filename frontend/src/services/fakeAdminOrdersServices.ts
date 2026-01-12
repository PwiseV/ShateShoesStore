import type {
  GetOrdersParams,
  OrderApiResponse,
  OrderData,
  UpdateOrderPayload,
} from "../pages/Admin/Orders/types";

// --- Mock Data ---
let mockOrders: OrderData[] = [
  {
    id: "1",
    orderNumber: "ORD001",
    name: "Hà Ngũ Long Nguyên",
    email: "phatminh@gmail.com",
    phone: "1234567890",
    address: "X12 khu Ủ, tp HCM",
    createdAt: "2023-06-12T10:30:00.000Z",
    total: 2000000,
    paymentMethod: "COD",
    status: "processing",
    items: [
      {
        id: "i1",
        productName: "Nike Jordan 1 Low",
        sku: "SH01",
        quantity: 1,
        price: 1000000,
        total: 1000000,
      },
      {
        id: "i2",
        productName: "Converse",
        sku: "SH21",
        quantity: 1,
        price: 400000,
        total: 400000,
      },
      {
        id: "i3",
        productName: "New Balance",
        sku: "SH31",
        quantity: 1,
        price: 600000,
        total: 600000,
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD002",
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0987654321",
    address: "Số 10, Đường ABC, Hà Nội",
    createdAt: "2023-06-13T08:15:00.000Z",
    total: 750000,
    paymentMethod: "Banking",
    status: "delivered",
    items: [
      {
        id: "i4",
        productName: "Adidas Ultraboost 22",
        sku: "SH02",
        quantity: 1,
        price: 750000,
        total: 750000,
      },
    ],
  },
  {
    id: "3",
    orderNumber: "ORD003",
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    phone: "0912345678",
    address: "Chung cư XYZ, Đà Nẵng",
    createdAt: "2023-06-14T14:20:00.000Z",
    total: 500000,
    paymentMethod: "COD",
    status: "cancelled",
    items: [
      {
        id: "i5",
        productName: "Puma RS-X Reinvention",
        sku: "SH03",
        quantity: 1,
        price: 500000,
        total: 500000,
      },
    ],
  },
];

// --- Mock Services ---

export const getAdminOrdersMock = (
  params: GetOrdersParams
): Promise<OrderApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockOrders];

      // 1. Filter Keyword
      if (params.keyword) {
        const kw = params.keyword.toLowerCase();
        filtered = filtered.filter(
          (o) =>
            o.orderNumber.toLowerCase().includes(kw) ||
            o.name.toLowerCase().includes(kw) ||
            (o.email && o.email.toLowerCase().includes(kw)) ||
            o.phone.includes(kw)
        );
      }

      // 2. Filter Status
      if (params.status) {
        filtered = filtered.filter((o) => o.status === params.status);
      }

      // 3. Filter Payment
      if (params.paymentMethod) {
        filtered = filtered.filter(
          (o) => o.paymentMethod === params.paymentMethod
        );
      }

      // 4. Filter Price
      if (params.minPrice !== undefined) {
        filtered = filtered.filter((o) => o.total >= (params.minPrice || 0));
      }
      if (params.maxPrice !== undefined) {
        filtered = filtered.filter((o) => o.total <= (params.maxPrice || 0));
      }

      // 5. Pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const total = filtered.length;
      const totalPages = Math.ceil(total / limit);
      const start = (page - 1) * limit;
      const data = filtered.slice(start, start + limit);

      resolve({
        data,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      });
    }, 500);
  });
};

export const updateAdminOrderMock = (
  id: string,
  payload: UpdateOrderPayload
): Promise<{ message: string; data: OrderData }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockOrders.findIndex((o) => o.id === id);
      if (index === -1) {
        return reject({ message: "Không tìm thấy đơn hàng" });
      }

      const currentOrder = { ...mockOrders[index] };

      // Validate Status flow (Simple mock)
      if (
        (currentOrder.status === "delivered" ||
          currentOrder.status === "cancelled") &&
        payload.status &&
        payload.status !== currentOrder.status
      ) {
        return reject({ message: "Không thể chỉnh sửa đơn hàng đã đóng" });
      }

      // Update Info
      if (payload.name) currentOrder.name = payload.name;
      if (payload.phone) currentOrder.phone = payload.phone;
      if (payload.address) currentOrder.address = payload.address;
      if (payload.status) currentOrder.status = payload.status as any;
      if (payload.paymentMethod)
        currentOrder.paymentMethod = payload.paymentMethod as any;

      // Update Items Logic (Backend Simulation)
      if (payload.items) {
        // Logic giả lập tính lại tiền:
        let newTotal = 0;

        // Map lại items từ mockOrders cũ để lấy giá (vì payload chỉ nên tin tưởng quantity/id)
        // Đây là code giả lập backend logic
        const updatedItems = payload.items.map((pItem) => {
          // Tìm thông tin item gốc để lấy giá (đề phòng hack giá từ FE)
          // Nếu là item mới thêm, ta phải tìm trong bảng Product (nhưng ở đây mock nên ta sẽ lấy từ FE gửi lên tạm thời hoặc tìm trong mockProducts)
          // Để đơn giản cho bản mock này: ta tin tưởng editedOrder state từ FE gửi xuống
          const existingItem = currentOrder.items.find(
            (i) => i.id === pItem.id
          );
          const price = existingItem ? existingItem.price : 0; // Thực tế phải query DB Product

          // Tuy nhiên, vì useOrdersLogic đang gửi items từ state FE (đầy đủ field), ta có thể "cheat" ở mock này bằng cách merge
          // Chú ý: trong thực tế payload items chỉ nên có {id, quantity}. Backend tự tìm giá.

          // Vì đây là mock service file, ta sẽ tạm chấp nhận logic FE gửi gì lưu đó cho các field hiển thị,
          // nhưng tính lại total.
          return {
            ...existingItem, // giữ thông tin cũ
            ...pItem, // đè thông tin mới (quantity)
            total: (existingItem?.price || 0) * (pItem.quantity || 0),
          } as any;
        });

        currentOrder.items = updatedItems.filter((i: any) => i.quantity > 0); // Xóa item quantity = 0

        // Tính lại tổng đơn
        currentOrder.total = currentOrder.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }

      // Save back to DB (mock array)
      mockOrders[index] = currentOrder;

      // ✅ Return chuẩn cấu trúc: { message, data }
      resolve({
        message: "Cập nhật đơn hàng thành công",
        data: currentOrder,
      });
    }, 600);
  });
};
