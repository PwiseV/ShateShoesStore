import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import slugify from "slugify";
import Session from "../models/Session.js";
import { OAuth2Client } from "google-auth-library";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 ngày
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra thiếu field
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    // Kiểm tra email đã tồn tại
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already used" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const baseUsername = slugify(name, {
      lower: true,
      strict: true,
      locale: "vi",
    }).replace(/-/g, "");

    let username = baseUsername;

    // Tạo user
    await User.create({
      username: username,
      hashedPassword,
      email,
      displayName: name,
    });

    // return
    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Lỗi khi gọi signUp", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const signIn = async (req, res) => {
  try {
    // lấy inputs
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Thiếu email hoặc password" });
    }

    // lấy hashedPassword trong db để so sánh với password của người dùng vừa nhập
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email hoặc password không đúng" });
    }

    // kiểm tra password
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCorrect) {
      return res
        .status(401)
        .json({ message: "Email hoặc password không đúng" });
    }

    // nếu khớp thì tạo access token với jwt
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    // tạo refresh token
    const refreshToken = crypto.randomBytes(64).toString("hex");

    // tạo session mới để lưu refresh token
    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
    });

    // gửi refresh token cho client qua cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true nếu dùng https
      sameSite: "lax",
      maxAge: REFRESH_TOKEN_TTL,
    });

    // còn access token thì trả thẳng về trong res
    return res.status(200).json({
      message: `User ${user.displayName} đã logged in!`,
      accessToken,
      user: {
        id: user._id,
        name: user.displayName,
        email: user.email,
        role: user.role ?? "customer",
      },
    });
  } catch (error) {
    console.error("Lỗi khi gọi signIp", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        message: "Không tìm thấy refresh token",
      });
    }

    const session = await Session.findOne({ refreshToken });
    console.log("session: ", session);

    if (!session) {
      return res.status(403).json({ message: "Refresh token không hợp lệ" });
    }

    if (session.expiresAt < new Date()) {
      return res.status(401).json({ message: "Refresh token đã hết hạn" });
    }

    const user = await User.findById(session.userId);

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_TTL }
    );

    return res.status(200).json({
      message: "Lấy access token thành công",
      accessToken,
      user: {
        id: user._id,
        name: user.displayName,
        email: user.email,
        role: user.role ?? "customer",
      },
    });
  } catch (err) {
    return res.status(403).json({ message: "Lỗi hệ thống" });
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
    return res.status(500).json({ message: "Google OAuth failed" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-hashedPassword");

    return res.json({
      user,
      message: `User ${user.displayName} đã logged in!`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
