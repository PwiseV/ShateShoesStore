import express from "express";
import { 
  getAllOrders, 
  getOrderDetail, 
  updateOrderAdmin,
  createOrder,
  getMyOrders,
  getMyOrderDetail
} from "../controllers/adminOrder.controller.js"; 

const router = express.Router();

router.get("/orders", getAllOrders); 
router.get("/orders/:id", getOrderDetail); 
router.patch("/orders/:id", updateOrderAdmin); 

router.get("/my-orders", getMyOrders);
router.get("/my-orders/:orderId", getMyOrderDetail)


router.post("/orders", createOrder);
export default router;