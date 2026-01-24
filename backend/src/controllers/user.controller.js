import * as userService from "../services/user.service.js";
import { handleServiceError } from "../utils/errorHandler.js";

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
    return handleServiceError(error, res);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await userService.getUser({ id });

    return res.status(200).json({
      success: true,
      message: "Lấy thông tin người dùng thành công",
      data: users,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const users = await userService.getUser({ id });

    return res.status(200).json({
      success: true,
      message: "Lấy thông tin người dùng thành công",
      data: users,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, displayName, phone, role, status } = req.body;
    const users = await userService.updateUser(
      id,
      { username, displayName, phone, role, status },
      req.file
    );

    return res.status(200).json({
      success: true,
      message: "Cập nhật người dùng thành công",
      data: users,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const { username, displayName, phone, role, status } = req.body;
    const users = await userService.updateUser(
      id,
      { username, displayName, phone, role, status },
      req.file
    );

    return res.status(200).json({
      success: true,
      message: "Cập nhật thông tin thành công",
      data: users,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};
