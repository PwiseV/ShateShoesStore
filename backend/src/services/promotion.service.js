import Promotion from "../models/Promotion.js";

export const createPromotion = async ({
  code,
  description,
  discountType,
  discountAmount,
  stock,
  minOrderAmount,
  expiredAt,
  startedAt
}) => {
  const existPromotionCode = await Promotion.findOne({ code });
  if (existPromotionCode) throw new Error("PROMOTION_CODE_EXISTS");

  const now = new Date();
  const start = startedAt ? new Date(startedAt) : new Date();
  const end = new Date(expiredAt);

  if (end <= now) throw new Error("EXPIRED_DATE_INVALID");

  if (start >= end) throw new Error("INVALID_DATE_RANGE");
  let active = "inactive";
  if (start > now) {
    active = "upcoming"
  }

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

export const getPromotions = async ({ page, limit, keyword, discountType, active, startDate, expiredDate }) => {
  const now = new Date();
  await Promotion.updateMany(
    { expiredAt: { $lt: now }, active: { $ne: "expired" } },
    { $set: { active: "expired" } }
  );
  await Promotion.updateMany(
    { 
      startedAt: { $lte: now }, 
      expiredAt: { $gt: now }, 
      active: "upcoming" 
    },
    { $set: { active: "active" } }
  );

  const filter = {};
  if (keyword) {
    filter.$or = [
      { code: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } }
    ];
  }

  if (discountType) filter.discountType = discountType;
  if (active) filter.active = active;

  if (startDate || expiredDate) {
    filter.expiredAt = {};
    if (startDate) filter.expiredAt.$gte = new Date(startDate);
    if (expiredDate) filter.expiredAt.$lte = new Date(expiredDate); 
  }

  const skip = (page - 1) * limit;
  const promotions = await Promotion.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Promotion.countDocuments(filter);
  return { promotions, total };
};

export const updatePromotion = async (id, {
  code,
  description,
  discountType,
  discountAmount,
  stock,
  minOrderAmount,
  expiredAt,
  startedAt,
  active
}) => {
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
    { new: true, runValidators: true }
  );
};

export const deletePromotion = async (id) => {
  const promotion = await Promotion.findById(id);
  
  if (!promotion) {
    throw new Error("PROMOTION_NOT_FOUND");
  }
  return await Promotion.findByIdAndDelete(id);
};