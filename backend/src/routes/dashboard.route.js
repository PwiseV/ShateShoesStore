import { Router } from "express";
import * as DashboardController from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/dashboard/overview", DashboardController.getOverview);
router.get("/dashboard/new-customers", DashboardController.getNewCustomers);
router.get("/dashboard/popular-products", DashboardController.getPopularProducts);
router.get("/dashboard/order-views", DashboardController.getProductViews);
router.get("/dashboard/new-comments", DashboardController.getNewComments);

export default router;