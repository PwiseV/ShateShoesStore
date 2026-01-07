export interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderData {
  id: string;
  orderNumber: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  total: number;
  paymentMethod: string;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
  items?: OrderItem[];
}
