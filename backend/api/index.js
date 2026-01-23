import "../src/loadEnv.js";
import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import { connectDB } from '../src/libs/db.js';
import "../src/config/cloudinary.js";

// Import routes
import authRoute from '../src/routes/auth.route.js';
import adminRoute from "../src/routes/admin.route.js";
import adminOrderRoute from "../src/routes/adminOrder.route.js";
import userRoute from "../src/routes/user.route.js";
import productRoute from "../src/routes/product.route.js";
import promotionRoute from "../src/routes/promotion.route.js";
import favouriteRoute from "../src/routes/favourite.route.js";
import addressRoute from "../src/routes/address.route.js";
import reviewRoute from "../src/routes/review.route.js";
import cartRoute from "../src/routes/cart.route.js";
import postRoute from "../src/routes/post.route.js";
import payosRoute from "../src/routes/payos.route.js";

import { protectedRoute } from "../src/middlewares/authMiddleware.js";
import { adminOnly } from '../src/middlewares/adminMiddleware.js';

const app = express();

// CORS config - add your Vercel frontend URL
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "http://localhost:5174", 
      "http://localhost:5175",
      process.env.FRONTEND_URL || "https://your-frontend.vercel.app"
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", protectedRoute, userRoute, productRoute, favouriteRoute, addressRoute, cartRoute, promotionRoute, adminOrderRoute, payosRoute, reviewRoute);
app.use("/api/admin", protectedRoute, adminOnly, adminRoute, productRoute, promotionRoute, userRoute, postRoute, adminOrderRoute);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running on Vercel" });
});

// Connect to DB once (Vercel will reuse connection)
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }
  await connectDB();
  isConnected = true;
};

// Export handler for Vercel
export default async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};
