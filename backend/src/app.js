import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

import "./config/cloudinary.js";
import authRoute from './routes/auth.route.js'
import adminRoute from "./routes/admin.route.js";
import adminOrderRoute from "./routes/adminOrder.route.js"
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js"
import promotionRoute from "./routes/promotion.route.js"
import favouriteRoute from "./routes/favourite.route.js"
import addressRoute from "./routes/address.route.js"
import reviewRoute from "./routes/review.route.js"
import cartRoute from "./routes/cart.route.js"
import postRoute from "./routes/post.route.js"
import payosRoute from "./routes/payos.route.js"
import blogRoute from "./routes/blog.route.js"
import contactRoute from "./routes/contact.route.js"
import dashboardRoute from "./routes/dashboard.route.js"

import { protectedRoute } from "./middlewares/authMiddleware.js";
import { adminOnly } from './middlewares/adminMiddleware.js';

const app = express();

// CORS config
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

// public routes (KHÔNG token)
app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);
app.use("/api/guest", productRoute);

// private user routes (CẦN đăng nhập)
app.use("/api/users", protectedRoute, userRoute, productRoute, favouriteRoute, addressRoute, cartRoute, promotionRoute, adminOrderRoute, payosRoute, reviewRoute, postRoute, contactRoute);

// admin routes (CẦN đăng nhập + quyền admin)
app.use("/api/admin", protectedRoute, adminOnly, adminRoute, productRoute, promotionRoute, userRoute, postRoute, adminOrderRoute, reviewRoute, dashboardRoute);

// Health check
app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});

export default app;
