import { useState } from "react";
import type { OrderData, OrderItem } from "../types";

// Mock available products
export const mockProducts = [
  { id: "p1", name: "Nike Jordan 1 Low", sku: "SH01", price: 1000000 },
  { id: "p2", name: "Converse", sku: "SH21", price: 400000 },
  { id: "p3", name: "New Balance", sku: "SH31", price: 600000 },
  { id: "p4", name: "Adidas Ultraboost 22", sku: "SH02", price: 750000 },
  { id: "p5", name: "Puma RS-X Reinvention", sku: "SH03", price: 500000 },
];

interface UseOrderDetailLogicProps {
  editedOrder: OrderData | null;
  onFieldChange: (field: keyof OrderData, value: any) => void;
}

export function useOrderDetailLogic({
  editedOrder,
  onFieldChange,
}: UseOrderDetailLogicProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [newProductQty, setNewProductQty] = useState<number>(1);

  const handleAddProduct = () => {
    if (!editedOrder || !selectedProductId || newProductQty < 1) return;
    const product = mockProducts.find((p) => p.id === selectedProductId);
    if (!product) return;

    const newItem: OrderItem = {
      id: `i${Date.now()}`,
      productName: product.name,
      sku: product.sku,
      quantity: newProductQty,
      price: product.price,
      total: product.price * newProductQty,
    };

    const updatedItems = [...(editedOrder.items || []), newItem];
    onFieldChange("items", updatedItems);
    setSelectedProductId("");
    setNewProductQty(1);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (!editedOrder) return;
    const updatedItems =
      editedOrder.items?.map((item) =>
        item.id === itemId
          ? { ...item, quantity: newQty, total: item.price * newQty }
          : item
      ) || [];
    onFieldChange("items", updatedItems);
  };

  const handleDeleteItem = (itemId: string) => {
    if (!editedOrder) return;
    const updatedItems =
      editedOrder.items?.filter((item) => item.id !== itemId) || [];
    onFieldChange("items", updatedItems);
  };

  const calculateTotal = () => {
    return editedOrder?.items?.reduce((sum, item) => sum + item.total, 0) || 0;
  };

  return {
    selectedProductId,
    setSelectedProductId,
    newProductQty,
    setNewProductQty,
    handleAddProduct,
    handleUpdateQuantity,
    handleDeleteItem,
    calculateTotal,
  };
}
