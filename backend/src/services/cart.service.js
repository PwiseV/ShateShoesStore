import CartItem from "../models/CartItem.js";
import ProductVariant from "../models/ProductVariant.js";

export const addToCart = async ({ userId, variantId, quantity }) => {
  const variant = await ProductVariant.findById(variantId);
  if (!variant) {
    throw new Error("VARIANT_NOT_FOUND");
  }
  if (variant.stock < quantity) {
    throw new Error("NOT_ENOUGH_STOCK");
  }

  const existingItem = await CartItem.findOne({ userId, variantId });

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;
    
    if (variant.stock < newQuantity) {
      throw new Error("TOTAL_EXCEEDS_STOCK");
    }
    
    existingItem.quantity = newQuantity;
    return await existingItem.save();
  }

  return await CartItem.create({
    userId,
    variantId,
    quantity,
  });
};
