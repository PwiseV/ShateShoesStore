import express from "express";
import {
    addToCart,
    getMyCart,
    updateCartItem,
    removeCartItem
} from "../controllers/cart.controller.js";

const router = express.Router();


router.post("/cart", addToCart);
router.get("/cart", getMyCart);
router.patch("/cart/:id", updateCartItem);
router.delete("/cart/:id", removeCartItem);

export default router;