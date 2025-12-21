// routes/devRoute.js
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

router.post("/create-admin", async (req, res) => {
  try {
    const { email = "admin@example.com", password = "Admin123!" } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Admin exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await User.create({
      username: "admin",
      displayName: "Admin",
      email,
      hashedPassword,
      role: "admin",
    });

    return res.json({ message: "Admin created", email: admin.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
