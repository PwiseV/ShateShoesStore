import * as promotionService from "../services/promotion.service.js";

export const createPromotion = async (req, res) => {
  try {
    const { code, description, discountType, discountAmount, totalQuantity, minOrderAmount, endDate, startDate } = req.body;
    if (!code || !description || !discountType || !discountAmount || !totalQuantity || !minOrderAmount || !endDate) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
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
      message: "Tạo khuyến mãi thành công",
    });
  } catch (error) {
    if (error.message === "PROMOTION_CODE_EXISTS") {
      return res.status(409).json({ message: "Mã khuyến mãi đã tồn tại" });
    }
    if (error.message === "EXPIRED_DATE_INVALID") {
      return res.status(400).json({ message: "Ngày kết thúc phải ở tương lai" });
    }
    if (error.message === "STARTED_DATE_INVALID") {
      return res.status(400).json({ message: "Ngày bắt đầu phải ở tương lai" });
    }
    if (error.message === "INVALID_DATE_RANGE") {
      return res.status(400).json({ message: "Ngày bắt đầu phải trước ngày kết thúc" });
    }
    console.error("Controller Error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
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
    return res.status(500).json({ message: "Lỗi hệ thống" });
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
    const errorMap = {
      "PROMOTION_NOT_FOUND": { status: 404, message: "Khuyến mãi không tìm thấy" },
      "PROMOTION_CODE_ALREADY_EXISTS": { status: 400, message: "Mã khuyến mãi đã tồn tại" },
      "INVALID_DATE_RANGE": { status: 400, message: "Ngày bắt đầu phải trước ngày hết hạn" },
      "CANNOT_SET_ACTIVE_BEFORE_START_DATE": { status: 400, message: "Không thể kích hoạt trước ngày bắt đầu" },
      "CANNOT_SET_ACTIVE_AFTER_EXPIRED_DATE": { status: 400, message: "Không thể kích hoạt sau ngày hết hạn" },
      "CANNOT_SET_UPCOMING_AFTER_START_DATE": { status: 400, message: "Đã qua ngày bắt đầu, không thể đặt là sắp diễn ra" },
      "CANNOT_SET_EXPIRED_BEFORE_END_DATE": { status: 400, message: "Khuyến mãi chưa kết thúc, không thể đặt là hết hạn" },
      "INVALID_STATUS_VALUE": { status: 400, message: "Trạng thái không hợp lệ" }
    };

    if (errorMap[error.message]) {
      const { status, message } = errorMap[error.message];
      return res.status(status).json({ message });
    }

    console.error("Controller Error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
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
    if (error.message === "PROMOTION_NOT_FOUND") {
      return res.status(404).json({
        message: "Khuyến mãi không tìm thấy",
      });
    }
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Định dạng ID khuyến mãi không hợp lệ",
      });
    }

    console.error("Delete Promotion Error:", error);
    return res.status(500).json({
      message: "Lỗi hệ thống",
    });
  }
};