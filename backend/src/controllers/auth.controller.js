import * as authService from "../services/auth.service.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import { handleServiceError } from "../utils/errorHandler.js";
import { getErrorMessage } from "../constants/errorMessages.js";

const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: getErrorMessage("MISSING_REQUIRED_FIELDS") });

    await authService.register({ name, email, password });
    return res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: getErrorMessage("MISSING_REQUIRED_FIELDS") });

    const { user, accessToken, refreshToken } = await authService.authenticate({
      email,
      password,
    });

    await authService.createSession(user._id, refreshToken, REFRESH_TOKEN_TTL);

    // Set cookie với settings phù hợp
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true if using https
      sameSite: "lax",
      maxAge: REFRESH_TOKEN_TTL,
      path: "/", // Đảm bảo cookie available cho tất cả paths
    });

    console.log("SignIn - Cookie set:", refreshToken ? "success" : "failed");

    return res.status(200).json({
      message: `Người dùng ${user.displayName || user.username} đã đăng nhập!`,
      accessToken,
      user: {
        id: user._id,
        name: user.displayName || user.username,
        email: user.email,
        role: user.role ?? "customer",
      },
    });
  } catch (error) {
    console.error("SignIn error:", error);
    return handleServiceError(error, res);
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const allCookies = req.cookies;
    
    console.log("=== REFRESH TOKEN DEBUG ===");
    console.log("All cookies:", Object.keys(allCookies));
    console.log("RefreshToken exists:", !!token);
    console.log("RefreshToken value:", token ? token.substring(0, 20) + "..." : "null");
    
    if (!token) {
      return res.status(401).json({ 
        message: "Không tìm thấy refresh token",
        code: "NO_REFRESH_TOKEN",
        debug: {
          cookiesReceived: Object.keys(allCookies),
          headers: req.headers.cookie
        }
      });
    }

    const { user, accessToken } = await authService.verifyAndRefreshSession(token);
    
    console.log("Refresh successful for user:", user.email);
    
    return res.status(200).json({
      message: "Làm mới access token thành công",
      accessToken,
      user: {
        id: user._id,
        name: user.displayName || user.username,
        email: user.email,
        role: user.role ?? "customer",
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error.message);
    
    // Clear invalid cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    
    return handleServiceError(error, res);
  }
};

// =================== OAuth Google =======================
console.log("=== ENV CHECK ===");
console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_REDIRECT_URI =", process.env.GOOGLE_REDIRECT_URI);

const oauthClient = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

export const googleAuth = async (req, res) => {
  const authUrl = oauthClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["profile", "email"],
  });

  return res.redirect(authUrl);
};

export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);

    const userInfo = await oauthClient.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });

    const { email, name, picture } = userInfo.data;

    let user = await User.findOne({ email });

    if (!user) {
      const safeUsername = email.split("@")[0];

      user = await User.create({
        username: safeUsername,
        hashedPassword: "",
        email,
        displayName: name || safeUsername,
        avatar: picture ? {
          url: picture,
          publicId: ""
        } : undefined,
        authType: "google",
        phone: "",
        role: "customer",
      });
    }

    if (!user.role) {
      user.role = "customer";
      await user.save();
    }

    // Generate tokens
    const accessToken = authService.generateAccessToken(user);
    const refreshToken = crypto.randomBytes(64).toString("hex");
    
    // Create session
    const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days
    await authService.createSession(user._id, refreshToken, REFRESH_TOKEN_TTL);
    
    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: REFRESH_TOKEN_TTL,
      path: "/", // Đảm bảo cookie available cho tất cả paths
    });

    console.log("OAuth - Cookie set:", refreshToken ? "success" : "failed");

    // Redirect with access token
    return res.redirect(`http://localhost:5173/login?token=${accessToken}`);
  } catch (err) {
    console.log("GOOGLE OAUTH ERROR:", err);
    return res.status(500).json({ message: getErrorMessage("SERVER_ERROR") });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-hashedPassword");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      user: {
        id: user._id,
        name: user.displayName || user.username,
        email: user.email,
        role: user.role,
      },
      message: `Người dùng ${user.displayName || user.username} đã đăng nhập!`,
    });
  } catch (err) {
    console.error("GetMe error:", err);
    return res.status(500).json({ message: getErrorMessage("SERVER_ERROR") });
  }
};

// ================== FORGOT / RESET PASSWORD ==================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: getErrorMessage("MISSING_REQUIRED_FIELDS") });
    }

    const token = await authService.requestPasswordReset(email);

    return res.status(200).json({
      message: "Yêu cầu đặt lại mật khẩu thành công",
      token, // ⚠️ demo only - remove in production
    });
  } catch (err) {
    return handleServiceError(err, res);
  }
};

export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    await authService.verifyResetToken(token);

    return res.status(200).json({
      message: "Token hợp lệ",
    });
  } catch (err) {
    return handleServiceError(err, res);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        message: getErrorMessage("MISSING_REQUIRED_FIELDS"),
      });
    }

    await authService.resetPassword(token, newPassword);

    return res.status(200).json({
      message: "Đặt lại mật khẩu thành công",
    });
  } catch (err) {
    return handleServiceError(err, res);
  }
};

// ================== CHANGE PASSWORD (LOGGED IN) ==================

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        message: getErrorMessage("MISSING_REQUIRED_FIELDS"),
      });
    }

    await authService.changePassword(
      req.user._id,
      oldPassword,
      newPassword
    );

    return res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (err) {
    return handleServiceError(err, res);
  }
};

// ================== LOGOUT ==================

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await authService.logout(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Đăng xuất thành công",
    });
  } catch (err) {
    return handleServiceError(err, res);
  }
};
