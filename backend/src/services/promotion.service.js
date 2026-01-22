import Promotion from "../models/Promotion.js";
import Order from "../models/Order.js";

export const createPromotion = async ({
  code,
  description,
  discountType,
  discountAmount,
  stock,
  minOrderAmount,
  expiredAt,
  startedAt,
}) => {
  const existPromotionCode = await Promotion.findOne({ code });
  if (existPromotionCode) throw new Error("PROMOTION_CODE_EXISTS");

  const now = new Date();
  const start = startedAt ? new Date(startedAt) : new Date();
  const end = new Date(expiredAt);

  if (end <= now) throw new Error("EXPIRED_DATE_INVALID");

  if (start >= end) throw new Error("INVALID_DATE_RANGE");
  let active = "inactive";

  if (start < now) throw new Error("STARTED_DATE_INVALID");
  else active = "upcoming";

  return await Promotion.create({
    code,
    description,
    discountType,
    discountAmount,
    stock,
    minOrderAmount,
    active,
    startedAt: start,
    expiredAt: end,
  });
};

export const getPromotions = async ({
  page,
  limit,
  keyword,
  discountType,
  active,
  startDate,
  expiredDate,
}) => {
  const now = new Date();
  await Promotion.updateMany(
    { expiredAt: { $lt: now }, active: { $ne: "expired" } },
    { $set: { active: "expired" } },
  );
  await Promotion.updateMany(
    {
      startedAt: { $lte: now },
      expiredAt: { $gt: now },
      active: "upcoming",
    },
    { $set: { active: "active" } },
  );

  const filter = {};
  if (keyword) {
    filter.$or = [
      { code: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  if (discountType) filter.discountType = discountType;
  if (active) filter.active = active;

  if (startDate || expiredDate) {
    filter.expiredAt = {};
    if (startDate) {
      filter.expiredAt.$gte = new Date(startDate);
    }
    if (expiredDate) {
      const end = new Date(expiredDate);
      end.setHours(23, 59, 59, 999);
      filter.expiredAt.$lte = end;
    }
  }

  const skip = (page - 1) * limit;
  const promotions = await Promotion.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Promotion.countDocuments(filter);
  return { promotions, total };
};

export const applyPromotion = async ({ code, userId, total }) => {
  if (!code) {
    throw new Error("PROMOTION_CODE_REQUIRED");
  }

  const now = new Date();
  const promotion = await Promotion.findOne({ code: code });

  if (!promotion) {
    throw new Error("PROMOTION_NOT_FOUND");
  }

  // 1. Đồng bộ trạng thái Active dựa trên thời gian
  let currentActiveStatus = promotion.active;
  if (promotion.expiredAt < now && promotion.active !== "expired") {
    currentActiveStatus = "expired";
  } else if (
    promotion.startedAt <= now &&
    promotion.expiredAt > now &&
    promotion.active === "upcoming"
  ) {
    currentActiveStatus = "active";
  }

  if (currentActiveStatus !== promotion.active) {
    promotion.active = currentActiveStatus;
    await promotion.save();
  }

  if (promotion.active === "expired") throw new Error("PROMOTION_EXPIRED");
  if (promotion.active === "upcoming") throw new Error("PROMOTION_NOT_STARTED");
  if (promotion.active === "inactive") throw new Error("PROMOTION_NOT_VALID");

  if (promotion.stock === 0) {
    throw new Error("PROMOTION_LIMIT_REACHED");
  }

  const existingOrderWithPromo = await Order.findOne({
    userId: userId,
    promotionId: promotion._id,
    status: { $ne: "cancelled" },
  });

  if (existingOrderWithPromo) {
    throw new Error("PROMOTION_ALREADY_USED_BY_USER");
  }

  if (total < promotion.minOrderAmount) {
    throw new Error("MIN_ORDER_VALUE_NOT_MET");
  }

  return {
    promotionId: promotion._id,
    code: promotion.code,
    description: promotion.description,
    discountType: promotion.discountType,
    discountAmount: promotion.discountAmount,
    minOrderAmount: promotion.minOrderAmount || 0,
    stock: promotion.stock || 0,
    active: promotion.active,
    startedAt: promotion.startedAt,
    expiredAt: promotion.expiredAt,
  };
};

export const getPromotionsForUser = async ({ userId, total }) => {
  const now = new Date();

  const usedPromotions = await Order.find({
    userId,
    promotionId: { $ne: null },
    status: { $ne: "cancelled" },
  }).distinct("promotionId");


  const filter = {
    active: "active",
    stock: { $gt: 0 },
    minOrderAmount: { $lte: total },
    startedAt: { $lte: now },
    expiredAt: { $gt: now },
    _id: { $nin: usedPromotions },
  };

  const promotions = await Promotion.find(filter)
    .sort({ minOrderAmount: 1 })
    .limit(2)
    .lean();

  const formattedPromotions = await Promise.all(
    promotions.map(async (promotion) => {
      return {
        promotionId: promotion._id,
        code: promotion.code,
        description: promotion.description,
        discountType: promotion.discountType,
        discountAmount: promotion.discountAmount,
        minOrderAmount: promotion.minOrderAmount || 0,
        stock: promotion.stock || 0,
        active: promotion.active,
        startedAt: promotion.startedAt,
        expiredAt: promotion.expiredAt,
      };
    }),
  );

  return formattedPromotions;
};

export const updatePromotion = async (
  id,
  {
    code,
    description,
    discountType,
    discountAmount,
    stock,
    minOrderAmount,
    expiredAt,
    startedAt,
    active,
  },
) => {
  const promotion = await Promotion.findById(id);
  if (!promotion) throw new Error("PROMOTION_NOT_FOUND");

  if (code && code !== promotion.code) {
    const codeExists = await Promotion.findOne({ code, _id: { $ne: id } });
    if (codeExists) throw new Error("PROMOTION_CODE_ALREADY_EXISTS");
  }

  const now = new Date();
  const start = startedAt ? new Date(startedAt) : new Date(promotion.startedAt);
  const end = expiredAt ? new Date(expiredAt) : new Date(promotion.expiredAt);

  if (start >= end) throw new Error("INVALID_DATE_RANGE");

  if (active) {
    if (active === "active") {
      if (now < start) throw new Error("CANNOT_SET_ACTIVE_BEFORE_START_DATE");
      if (now > end) throw new Error("CANNOT_SET_ACTIVE_AFTER_EXPIRED_DATE");
    }

    if (active === "upcoming") {
      if (now >= start) throw new Error("CANNOT_SET_UPCOMING_AFTER_START_DATE");
    }

    if (active === "expired") {
      if (now <= end) throw new Error("CANNOT_SET_EXPIRED_BEFORE_END_DATE");
    }
  } else {
    if (end <= now) active = "expired";
    else if (start > now) active = "upcoming";
    else active = "active";
  }

  // 4. Cập nhật vào Database
  return await Promotion.findByIdAndUpdate(
    id,
    {
      code,
      description,
      discountType,
      discountAmount,
      stock,
      minOrderAmount,
      active,
      startedAt: start,
      expiredAt: end,
    },
    { new: true, runValidators: true },
  );
};

export const deletePromotion = async (id) => {
  const promotion = await Promotion.findById(id);

  if (!promotion) {
    throw new Error("PROMOTION_NOT_FOUND");
  }
  return await Promotion.findByIdAndDelete(id);
};
