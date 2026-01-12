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