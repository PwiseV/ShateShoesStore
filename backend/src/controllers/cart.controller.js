import * as cartService from "../services/cart.service.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { variantId, quantity } = req.body;

    const item = await cartService.addToCart({ userId, variantId, quantity });
    
    return res.status(200).json({ 
      success: true, 
      message: "Item added to cart successfully", 
      data: item 
    });
  } catch (error) {
    if (error.message === "VARIANT_NOT_FOUND") {
      return res.status(404).json({ message: "Product variant not found" });
    }
    
    if (error.message === "NOT_ENOUGH_STOCK" || error.message === "TOTAL_EXCEEDS_STOCK") {
      return res.status(400).json({ message: "Insufficient stock available" });
    }

    console.error("Add to cart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
