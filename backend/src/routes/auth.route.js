import express from 'express';
import { signUp, signIn, refreshAccessToken } from '../controllers/auth.controller.js';
import { googleAuth, googleCallback } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';
import { getMe } from '../controllers/auth.controller.js';

// forgot password routes
import {
  forgotPassword,
  verifyResetToken,
  resetPassword,
  changePassword,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup",signUp);
router.post("/signin",signIn);
router.post("/refresh-token", refreshAccessToken);

// ======= FORGOT PASSWORD ROUTES =======
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:token", verifyResetToken);
router.post("/reset-password", resetPassword);

// change password while logged in
router.put("/change-password", protectedRoute, changePassword);


// Oauth google, facebook , linkedin ... sẽ thêm sau

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/me", protectedRoute, getMe);


export default router;  