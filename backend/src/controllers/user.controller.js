import * as userService from "../services/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { role, status, keyword, order } = req.query;

    const { users, total } = await userService.getUsers({
      page,
      limit,
      role,
      status,
      keyword,
      order,
    });

    return res.status(200).json({
      success: true,
      message: "Lấy danh sách người dùng thành công",
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await userService.getUser({
      id,
    });

    return res.status(200).json({
      success: true,
      message: "Lấy thông tin người dùng thành công",
      data: users,
    });
  } catch (error) {
    if (error.message === "USER_ID_REQUIRED") {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, displayName, phone, role, status } = req.body;
    const users = await userService.updateUser(
      id,
      {
        username,
        displayName,
        phone,
        role,
        status,
      },
      req.file
    );

    return res.status(200).json({
      success: true,
      message: "Cập nhật người dùng thành công",
      data: users,
    });
  } catch (error) {
    if (error.message === "USER_ID_REQUIRED") {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
