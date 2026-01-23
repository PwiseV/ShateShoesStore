import {
    createPromotion,
    getPromotions,
    updatePromotion,
    deletePromotion,
    applyPromotion,
    getUserAvailablePromotions
} from "../controllers/promotion.controller.js";
import express from "express";

const router = express.Router();

router.post("/promotions", createPromotion);
router.get("/promotions", getPromotions);
router.patch("/promotions/:id", updatePromotion);
router.delete("/promotions/:id", deletePromotion);
router.post("/promotions/coupon", applyPromotion);
router.get("/promotions/coupon", getUserAvailablePromotions);

export default router;
