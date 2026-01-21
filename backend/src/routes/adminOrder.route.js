import express from "express";
import { 
  getAllOrders, 
  getOrderDetail, 
  updateOrderAdmin,
  createOrder
} from "../controllers/adminOrder.controller.js"; 

const router = express.Router();

router.get("/orders", getAllOrders); // get all orders list and search
router.get("/orders/:id", getOrderDetail); // detail of an order
router.patch("/orders/:id", updateOrderAdmin); // update order

// thêm tạm
router.post("/orders", createOrder);
export default router;