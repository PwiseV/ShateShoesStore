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

export const getMyCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await cartService.getCart(userId);

    return res.status(200).json({
      success: true,
      message: "Fetch cart successfully",
      data: cart,
    });
  } catch (error) {
    console.error("Get cart controller error:", error);
    return res.status(500).json({ 
      message: "Internal server error" 
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { quantity, variantId } = req.body;

    const updated = await cartService.updateQuantity({ userId, cartItemId: id, quantity, variantId });
    
    return res.status(200).json({ 
      success: true, 
      message: "Cart updated successfully", 
      data: updated 
    });
  } catch (error) {
    if (error.message === "CART_ITEM_NOT_FOUND") {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (error.message === "VARIANT_ALREADY_IN_CART") {
      return res.status(409).json({ message: "This product variation is already in your cart" });
    }
    
    if (error.message === "NOT_ENOUGH_STOCK") {
      return res.status(400).json({ message: "Requested quantity exceeds available stock" });
    }

    console.error("Update cart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    await cartService.removeFromCart(userId, id);
    return res.status(200).json({ 
      success: true, 
      message: "Item removed from cart successfully" 
    });
  } catch (error) {
    if (error.message === "CART_ITEM_NOT_FOUND") {
      return res.status(404).json({ message: "Cart item not found" });
    }
    console.error("Remove cart error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



