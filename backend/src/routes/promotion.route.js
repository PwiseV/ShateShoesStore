import {
    createPromotion,
    getPromotions,
    updatePromotion,
    deletePromotion
} from "../controllers/promotion.controller.js";
import express from "express";

const router = express.Router();

router.post("/promotions", createPromotion);
router.get("/promotions", getPromotions);
router.patch("/promotions/:id", updatePromotion);
router.delete("/promotions/:id", deletePromotion);

export default router;
