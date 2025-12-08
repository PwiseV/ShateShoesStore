import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedRoute = (req, res, next) => {
  try {
    // lấy token từ header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy access token" });
    }
    // xác nhận token hợp lệ
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        console.error(err);
        return res
          .status(403)
          .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
      }

      // tìm user
      const user = await User.findById(decoded.userId).select(
        "-hashedPassword"
      );

      if (!user) {
        return res.status(404).json({ message: "User không tồn tại" });
      }

      req.user = user; 
      next();
    });
  } catch (error) {
    console.error("Lỗi khi xác minh JWT trong authMiddleware:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

// Middleware kiểm tra access token
// export const authenticate = async (req, res, next) => {
//   try {
//     // Ưu tiên lấy token từ cookie -> sau đó đến Authorization header
//     const token =
//       req.cookies?.accessToken ||
//       (req.headers.authorization?.startsWith("Bearer ")
//         ? req.headers.authorization.split(" ")[1]
//         : null);

//     if (!token) {
//       return res.status(401).json({ message: "Bạn chưa đăng nhập !" });
//     }

//     // Verify JWT
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     // Lấy user từ DB (đảm bảo user còn tồn tại)
//     const user = await User.findById(decoded.userId).lean();
//     if (!user) {
//       return res.status(401).json({ message: "Tài khoản không tồn tại !" });
//     }

//     // Gắn vào request để API phía sau dùng tiếp
//     req.user = {
//       userId: user._id,
//       role: user.role,
//       username: user.username,
//       email: user.email,
//     };

//     next();
//   } catch (err) {
//     console.error("AUTH ERROR:", err);
//     return res.status(403).json({ message: "Token sai hoặc đã hết hạn!" });
//   }
// };

// // Middleware kiểm tra vai trò (role-based authorization)
// export const authorize = (role) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ message: "Chưa xác thực !" });
//     }

//     if (req.user.role !== role) {
//       return res.status(403).json({ message: "Không có quyền truy cập route này!" });
//     }

//     next();
//   };
// };
