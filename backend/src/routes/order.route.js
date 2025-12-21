import express from "express";

import { createOrder } from "../controllers/order.controller.js";


const router = express.Router();


/* =========================
   PRODUCT
========================= */
router.post("/order", createOrder);

export default router;
