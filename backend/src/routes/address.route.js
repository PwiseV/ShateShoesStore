import express from "express";

const router = express.Router();

router.post("/users/:id/addresses");
router.get("/users/:id/addresses");
router.patch("/users/:id/addresses/:addressId");
router.delete("/users/:id/:addressId");



export default router;