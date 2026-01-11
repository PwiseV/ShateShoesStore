import express from "express";
import {
  createProduct,
  getProduct,
  createProductVariant,
  updateProduct,
  deleteProduct,
  updateProductVariant,
  deleteProductVariant,
} from "../controllers/product.controller.js";

import { createCategory, getCategory } from "../controllers/category.controller.js";

import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

/* =========================
   CATEGORY
========================= */
router.post("/category", createCategory);
router.get("/category", getCategory);

/* =========================
   PRODUCT
========================= */
router.post("/products",upload.single("avatar"), createProduct);
router.get("/products", getProduct);
router.patch("/products/:id", upload.single("avatar"), updateProduct);
router.delete("/products/:id", deleteProduct);
/* =========================
   VARIANT (FK -> Product)
========================= */

router.post("/products/:id/variants", upload.single("avatar"), createProductVariant);
router.patch("/products/:id/variants", upload.single("avatar"), updateProductVariant);
router.delete("/products/:id/variants", deleteProductVariant);


export default router;
