import express from 'express';
import { signUp, signIn, refreshAccessToken } from '../controllers/authController.js';
import { googleAuth, googleCallback } from '../controllers/authController.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';
import { getMe } from '../controllers/authController.js';

const router = express.Router();

router.post("/signup",signUp);
router.post("/signin",signIn);
router.post("/refresh-token", refreshAccessToken);

// Oauth google, facebook , linkedin ... sẽ thêm sau

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/me", protectedRoute, getMe);


export default router;  