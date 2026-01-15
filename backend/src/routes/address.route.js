import express from "express";
import { createUserAddress, getUserAddresses, updateUserAddress, deleteUserAddress } from "../controllers/address.controller.js";
const router = express.Router();

router.post("/users/:id/addresses", createUserAddress);
router.get("/users/:id/addresses", getUserAddresses);
router.patch("/users/:id/addresses/:addressId", updateUserAddress);
router.delete("/users/:id/addresses/:addressId", deleteUserAddress);



export default router;