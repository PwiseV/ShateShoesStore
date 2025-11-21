import express from 'express';
import { signUp } from '../controllers/authController.js';
import { signIn } from '../controllers/authController.js';
import { googleAuth, googleCallback } from '../controllers/authController.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';
import { getMe } from '../controllers/authController.js';

const router = express.Router();

router.post("/signup",signUp);
router.post("/signin",signIn);

// Oauth google, facebook , linkedin ... sẽ thêm sau

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/me", protectedRoute, getMe);


export default router;  