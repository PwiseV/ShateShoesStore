import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import slugify from "slugify";
import Session from "../models/Session.js";

const ACCESS_TOKEN_TTL = "30m";

export const register = async ({ name, email, password }) => {
    const exist = await User.findOne({ email });
    if (exist) throw new Error("Email already used");

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = slugify(name, { lower: true, strict: true, locale: "vi" }).replace(/-/g, "");

    return await User.create({
        username,
        hashedPassword,
        email,
        displayName: name,
    });
};

export const authenticate = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Incorrect email or password");

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) throw new Error("Incorrect email or password");

    const accessToken = generateAccessToken(user);
    const refreshToken = crypto.randomBytes(64).toString("hex");

    return { user, accessToken, refreshToken };
};

export const createSession = async (userId, refreshToken, ttl) => {
    return await Session.create({
        userId,
        refreshToken,
        expiresAt: new Date(Date.now() + ttl),
    });
};

export const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_TTL }
    );
};

export const verifyAndRefreshSession = async (refreshToken) => {
    const session = await Session.findOne({ refreshToken });
    if (!session) throw new Error("Refresh token is not valid");
    if (session.expiresAt < new Date()) throw new Error("Refresh token is expired");

    const user = await User.findById(session.userId);
    const accessToken = generateAccessToken(user);

    return { user, accessToken };
};



// ================== FORGOT / RESET PASSWORD ==================

// ------- Request password reset -------
export const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email không tồn tại");
  }

  // admin account cannt reset password via this flow
  if (user.role === "admin") {
    throw new Error("Tài khoản admin không thể sử dụng chức năng này");
  }

  // gg acctount cannot reset password via this flow
  if (user.authType === "google") {
    throw new Error("Tài khoản Google không thể đặt lại mật khẩu");
  }

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 phút

  await user.save();

  // In production, this token should be sent via email.
  // For demo/testing purpose, we return it directly.
  return rawToken;
};

// -------- verify reset token -------
export const verifyResetToken = async (token) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Token không hợp lệ hoặc đã hết hạn");
  }

  return true;
};


// -------- reset password -------
export const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Token không hợp lệ hoặc đã hết hạn");
  }

  user.hashedPassword = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
};


// ------- Change password (while logged in) -------
export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User không tồn tại");
  }

  if (user.authType === "google") {
    throw new Error("Tài khoản Google không thể đổi mật khẩu");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.hashedPassword);
  if (!isMatch) {
    throw new Error("Mật khẩu hiện tại không đúng");
  }

  user.hashedPassword = await bcrypt.hash(newPassword, 10);
  await user.save();
};

