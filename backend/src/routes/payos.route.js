import express from "express";
const router = express.Router();
import { createLink, webhook } from "../controllers/payos.controller.js";

router.post("/payos/create-link", createLink);

// Endpoint: /api/payos/webhook (Cấu hình link này trên PayOS Dashboard)
router.post("/payos/webhook", webhook);

export default router;
