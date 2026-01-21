import express from "express";
import {
  createUserAddress,
  getUserAddresses,
  updateUserAddress,
  deleteUserAddress,
} from "../controllers/address.controller.js";
const router = express.Router();

router.post("/addresses", createUserAddress);
router.get("/addresses", getUserAddresses);
router.patch("/addresses/:addressId", updateUserAddress);
router.delete("/addresses/:addressId", deleteUserAddress);

export default router;
