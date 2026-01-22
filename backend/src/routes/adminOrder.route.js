import express from "express";
import { 
  getAllOrders, 
  getOrderDetail, 
  updateOrderAdmin,
  createOrder,
  getMyOrders
} from "../controllers/adminOrder.controller.js"; 

const router = express.Router();

router.get("/orders", getAllOrders); // get all orders list and search
router.get("/orders/:id", getOrderDetail); // detail of an order
router.patch("/orders/:id", updateOrderAdmin); // update order

router.get("/my-orders/", getMyOrders);


router.post("/orders", createOrder);
export default router;