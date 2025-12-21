import express from "express";
import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,

  // Size
  createSizeVariant,
  getSizeVariant,
  deleteSizeVariant,

  // Color
  createColorVariant,
  getColorVariant,
  updateColorVariant,
  deleteColorVariant,
} from "../controllers/product.controller.js";

import { createCategory } from "../controllers/category.controller.js";

const router = express.Router();

/* =========================
   CATEGORY
========================= */
router.post("/category", createCategory);

/* =========================
   PRODUCT
========================= */
router.post("/products", createProduct);
router.get("/products", getProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

/* =========================
   SIZE VARIANT (FK -> Product)
========================= */

router.get("/products/:productId/sizes", getSizeVariant);
router.post("/products/:productId/sizes", createSizeVariant);
router.delete("/product-sizes/:sizeId", deleteSizeVariant);

/* =========================
   COLOR VARIANT (FK -> Size)
========================= */

router.get(
  "/product-sizes/:sizeId/colors",
  getColorVariant
);

router.post(
  "/product-sizes/:sizeId/colors",
  createColorVariant
);

router.patch(
  "/product-colors/:colorId",
  updateColorVariant
);

router.delete(
  "/product-colors/:colorId",
  deleteColorVariant
);

export default router;
