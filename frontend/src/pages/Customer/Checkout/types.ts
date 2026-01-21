// src/types/order.ts

import type { CartItem } from "../Cart/types";

export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  note?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  total: number;
  discount: number;
  finalTotal: number;
  createdAt: string;
  status: "PENDING" | "CONFIRMED" | "SHIPPED";
}

export interface CreateOrderPayload {
  items: CartItem[];
  shippingInfo: ShippingInfo;
  total: number;
  discount: number;
  finalTotal: number;
}
