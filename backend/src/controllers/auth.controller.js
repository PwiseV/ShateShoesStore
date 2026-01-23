import * as authService from "../services/auth.service.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 ngày

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });

    await authService.register({ name, email, password });
    return res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });

    const { user, accessToken, refreshToken } = await authService.authenticate({
      email,
      password,
    });

    await authService.createSession(user._id, refreshToken, REFRESH_TOKEN_TTL);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true nếu dùng https
      sameSite: "lax",
      maxAge: REFRESH_TOKEN_TTL,
    });

    return res.status(200).json({
      message: `Người dùng ${user.displayName} đã đăng nhập!`,
      accessToken,
      user: {
        id: user._id,
        name: user.displayName,
        email: user.email,
        role: user.role ?? "customer",
      },
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return res.status(401).json({ message: "Không tìm thấy refresh token" });

    const { user, accessToken } = await authService.verifyAndRefreshSession(
      token
    );
    return res.status(200).json({
      message: "Làm mới access token thành công",
      accessToken,
      user: {
        id: user._id,
        name: user.displayName,
        email: user.email,
        role: user.role ?? "customer",
      },
    });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

// =================== Oauth google, facebook , linkedin =======================
console.log("=== ENV CHECK ===");
console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_REDIRECT_URI =", process.env.GOOGLE_REDIRECT_URI);

// Khởi tạo OAuth2Client
const oauthClient = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
});

// Đây là chỗ FE click nút “Login with Google” → BE redirect tới Google.
export const googleAuth = async (req, res) => {
  // BE sẽ tạo ra URL Google OAuth hợp lệ

  const authUrl = oauthClient.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["profile", "email"],
  });

  // Redirect user tới URL của Google
  return res.redirect(authUrl);
};

// Đây là callback route mà Google redirect về sau khi user đồng ý cấp quyền.
export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);

    const userInfo = await oauthClient.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });

    const { email, name, picture } = userInfo.data;

    // Tìm user theo email
    let user = await User.findOne({ email });

    if (!user) {
      // Tạo username an toàn (không trùng, không khoảng trắng)
      const safeUsername = email.split("@")[0];

      user = await User.create({
        username: safeUsername,
        hashedPassword: "", // Google không có password
        email,
        displayName: name,
        avatarUrl: picture || "",
        authType: "google",
        role: "customer",
      });
    }

    // Nếu user đã tồn tại -> set role
    if (!user.role) {
      user.role = "customer";
      await user.save();
    }
    // Tạo JWT
    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Redirect về FE kèm token
    return res.redirect(`http://localhost:5173/login?token=${jwtToken}`);
  } catch (err) {
    console.log("GOOGLE OAUTH ERROR:", err);
    return res.status(500).json({ message: "Đăng nhập Google thất bại" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-hashedPassword");

    return res.json({
      user,
      message: `Người dùng ${user.displayName} đã đăng nhập!`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
