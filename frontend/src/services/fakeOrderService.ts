import type { CreateOrderPayload, Order } from "../pages/Customer/Checkout/types";

// ===== STORAGE KEYS =====
const ORDER_STORAGE_KEY = "mock_orders";
const CART_STORAGE_KEY = "shopping_cart_data";

// ===== HELPERS =====
const getOrdersFromStorage = (): Order[] => {
  const data = localStorage.getItem(ORDER_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveOrdersToStorage = (orders: Order[]) => {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
};

const clearCartStorage = () => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
};

// ===== API MOCK =====

/**
 * [POST] Tạo đơn hàng
 */
export const createOrder = async (
  payload: CreateOrderPayload
): Promise<{ success: boolean; orderId: string }> => {
  await new Promise((res) => setTimeout(res, 1000));

  const orders = getOrdersFromStorage();

  const newOrder: Order = {
    id: `ORD-${Date.now()}`,
    items: payload.items,
    shippingInfo: payload.shippingInfo,
    total: payload.total,
    discount: payload.discount,
    finalTotal: payload.finalTotal,
    createdAt: new Date().toISOString(),
    status: "PENDING",
  };

  saveOrdersToStorage([newOrder, ...orders]);
  clearCartStorage(); // clear cart sau khi đặt

  return {
    success: true,
    orderId: newOrder.id,
  };
};

/**
 * [GET] Lấy danh sách đơn hàng (user)
 */
export const getOrders = async (): Promise<Order[]> => {
  await new Promise((res) => setTimeout(res, 500));
  return getOrdersFromStorage();
};

/**
 * [GET] Chi tiết đơn hàng
 */
export const getOrderById = async (
  orderId: string
): Promise<Order | undefined> => {
  await new Promise((res) => setTimeout(res, 400));
  return getOrdersFromStorage().find((o) => o.id === orderId);
};
