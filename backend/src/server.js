import "./loadEnv.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./libs/db.js";
import "./config/cloudinary.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import postRoute from "./routes/post.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";

import { protectedRoute } from "./middlewares/authMiddleware.js";
import { adminOnly } from "./middlewares/adminMiddleware.js";
// import devRoute from "./routes/devRoute.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// public routes (KHÔNG token)
app.use("/api/auth", authRoute);

// private user routes (CẦN đăng nhập)
app.use("/api/users", protectedRoute, userRoute);

// admin routes (CẦN đăng nhập + quyền admin)
app.use(
  "/api/admin",
  protectedRoute,
  adminOnly,
  adminRoute,
  productRoute,
  postRoute
);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu trên cổng ${PORT}`);
  });
});
