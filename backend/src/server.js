import "./loadEnv.js"; 

import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

import { connectDB } from './libs/db.js';

import authRoute from './routes/authRoute.js'
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js";

import { protectedRoute } from "./middlewares/authMiddleware.js";
import { adminOnly } from './middlewares/adminMiddleware.js';
// import devRoute from "./routes/devRoute.js";

const app = express();
const PORT = process.env.PORT || 5001;


app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
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
app.use("/api/admin", protectedRoute, adminOnly, adminRoute);



connectDB().then(()=> {
    app.listen(PORT, () => {
    console.log(`Server bắt đầu trên cổng ${PORT}`);
    });
});


