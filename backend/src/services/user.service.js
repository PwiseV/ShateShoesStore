import User from "../models/User.js";

export const getUsers = async ({
  page,
  limit,
  role,
  status,
  keyword,
  order,
}) => {
  const filter = {};
  if (role) filter.role = role;

  if (status) filter.status = status;

  if (keyword) {
    filter.$or = [
      { username: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
      { phone: { $regex: keyword, $options: "i" } },
    ];
  }

  let sortCriteria = { createdAt: -1 };
  if (order) {
    const [field, direction] = order.split("_");
    sortCriteria = { [field]: direction === "desc" ? -1 : 1 };
  }

  const skip = (page - 1) * limit;

  const [rawUsers, total] = await Promise.all([
    User.find(filter)
      .select("-password")
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit),
    User.countDocuments(filter),
  ]);

  const users = rawUsers.map((user) => ({
    userId: user._id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    phone: user.phone,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    avatar: user.avatar.url || null,
    orderCount: 5,
    totalSpent: 300000000,
  }));

  return { users, total };
};

export const getUser = async (id) => {
  if (!id) throw new Error("USER_ID_REQUIRED");
  const user = await User.findById(id).select("-hashedPassword").lean();
  if (!user) throw new Error("USER_NOT_FOUND");
  return {
    userId: user._id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    phone: user.phone,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    avatar: user.avatar.url || null,
    orderCount: 5,
    totalSpent: 300000000,
  };
};