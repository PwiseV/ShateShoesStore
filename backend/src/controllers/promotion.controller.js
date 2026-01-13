import * as promotionService from "../services/promotion.service.js";

export const createPromotion = async (req, res) => {
  try {
    const { code, description, discountType, discountAmount, totalQuantity, minOrderAmount, endDate, startDate } = req.body;
    if (!code || !description || !discountType || !discountAmount || !totalQuantity || !minOrderAmount || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPromotion = await promotionService.createPromotion({
      code,
      description,
      discountType,
      discountAmount,
      stock: totalQuantity,
      minOrderAmount,
      expiredAt: endDate,
      startedAt: startDate
    });

    return res.status(201).json({
      message: "Create promotion success",
    });
  } catch (error) {
    if (error.message === "PROMOTION_CODE_EXISTS") {
      return res.status(409).json({ message: "Promotion Code already exists" });
    }
    if (error.message === "EXPIRED_DATE_INVALID") {
      return res.status(400).json({ message: "End date must be in the future" });
    }
    if (error.message === "STARTED_DATE_INVALID") {
      return res.status(400).json({ message: "Start date must be in the future" });
    }
    if (error.message === "INVALID_DATE_RANGE") {
      return res.status(400).json({ message: "Invalid date range: start date must be before end date" });
    }
    console.error("Controller Error:", error);
    return res.status(500).json({ message: "Server error" });
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
      message: "Fetch promotions success",
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
    return res.status(500).json({ message: "Server error" });
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
      message: "Update promotion success"
    });

  } catch (error) {
    const errorMap = {
      "PROMOTION_NOT_FOUND": { status: 404, message: "Promotion not found" },
      "PROMOTION_CODE_ALREADY_EXISTS": { status: 400, message: "Promotion code already exists" },
      "INVALID_DATE_RANGE": { status: 400, message: "Start date must be before expired date" },
      "CANNOT_SET_ACTIVE_BEFORE_START_DATE": { status: 400, message: "Cannot activate before the start date" },
      "CANNOT_SET_ACTIVE_AFTER_EXPIRED_DATE": { status: 400, message: "Cannot activate after the expired date" },
      "CANNOT_SET_UPCOMING_AFTER_START_DATE": { status: 400, message: "Current time is already past start date, cannot set to upcoming" },
      "CANNOT_SET_EXPIRED_BEFORE_END_DATE": { status: 400, message: "Promotion has not ended yet, cannot set to expired" },
      "INVALID_STATUS_VALUE": { status: 400, message: "Invalid status value" }
    };

    if (errorMap[error.message]) {
      const { status, message } = errorMap[error.message];
      return res.status(status).json({ message });
    }

    console.error("Controller Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    await promotionService.deletePromotion(id);

    return res.status(200).json({
      message: "Promotion deleted successfully",
    });

  } catch (error) {
    if (error.message === "PROMOTION_NOT_FOUND") {
      return res.status(404).json({
        message: "Promotion not found",
      });
    }
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid Promotion ID format",
      });
    }

    console.error("Delete Promotion Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};