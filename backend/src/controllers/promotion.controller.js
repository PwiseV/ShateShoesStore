import * as promotionService from "../services/promotion.service.js";
import { handleServiceError } from "../utils/errorHandler.js";
import { getErrorMessage } from "../constants/errorMessages.js";

export const createPromotion = async (req, res) => {
  try {
    const { code, description, discountType, discountAmount, totalQuantity, minOrderAmount, endDate, startDate } = req.body;
    if (!code || !description || !discountType || !discountAmount || !totalQuantity || !minOrderAmount || !endDate) {
      return res.status(400).json({ message: getErrorMessage("MISSING_REQUIRED_FIELDS") });
    }

    const newPromotion = await promotionService.createPromotion({
      code,
      description,
      discountType,
      discountAmount,
      stock: totalQuantity,
      minOrderAmount,
      expiredAt: endDate,
      startedAt: startDate,
    });

    return res.status(201).json({
      message: "Tạo khuyến mãi thành công",
    });
  } catch (error) {
    const message = getErrorMessage(error.message);
    const statusCode = error.message === "PROMOTION_CODE_EXISTS" ? 409 : 400;
    console.error("Controller Error:", error);
    return res.status(statusCode).json({ message });
  }
};

export const getPromotions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const {
      keyword,
      discountType,
      status,
      startDate,
      endDate
    } = req.query;

    const { promotions, total } = await promotionService.getPromotions({
      page,
      limit,
      keyword,
      discountType,
      active: status,
      startDate: startDate,
      expiredDate: endDate,
    });

    return res.status(200).json({
      success: true,
      message: "Lấy danh sách khuyến mãi thành công",
      data: promotions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get promotions controller error:", error);
    return res.status(500).json({ message: getErrorMessage("SERVER_ERROR") });
  }
};

export const applyPromotion = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { codeString, total } = req.body;

    const promotion = await promotionService.applyPromotion({
      codeString,
      userId,
      total,
    });

    return res.status(200).json({
      success: true,
      message: "Áp dụng khuyến mãi thành công",
      data: promotion,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const getUserAvailablePromotions = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { total } = req.query;
    const  promotions  = await promotionService.getPromotionsForUser({
      userId,
      total
    });

    return res.status(200).json({
      success: true,
      message: "Lấy danh sách khuyến mãi thành công",
      data: promotions
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      code,
      description,
      discountType,
      discountAmount,
      totalQuantity,
      minOrderAmount,
      endDate,
      startDate,
      status
    } = req.body;

    const updatedPromotion = await promotionService.updatePromotion(id, {
      code,
      description,
      discountType,
      discountAmount,
      stock: totalQuantity,
      minOrderAmount,
      expiredAt: endDate,
      startedAt: startDate,
      active: status
    });

    return res.status(200).json({
      message: "Cập nhật khuyến mãi thành công"
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    await promotionService.deletePromotion(id);

    return res.status(200).json({
      message: "Xóa khuyến mãi thành công",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Định dạng ID khuyến mãi không hợp lệ",
      });
    }
    return handleServiceError(error, res);
  }
};
