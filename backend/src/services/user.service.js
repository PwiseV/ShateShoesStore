import User from "../models/User.js";
import Address from "../models/Address.js";
import { uploadImageToCloudinary } from "./cloudinary.service.js";

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
  // if (order) {
  //   const [field, direction] = order.split("_");
  //   sortCriteria = { [field]: direction === "desc" ? -1 : 1 };
  // }

  const skip = (page - 1) * limit;

  const rawUsers = await User.aggregate([
    { $match: filter },
    { $sort: sortCriteria},
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "addresses",
        localField: "_id",
        foreignField: "userId",
        as: "userAddresses"
      }
    },
    {
      $project: { hashedPassword: 0 }
    }
  ])

  const total = await User.countDocuments(filter);

  const users = rawUsers.map((user) => ({
    userId: user._id,
    username: user.username,
    email: user.email,
    displayName: user.displayName,
    phone: user.phone,
    role: user.role,
    status: user.status || "active",
    createdAt: user.createdAt,
    avatar: user.avatar?.url || null,
    orderCount: 5,
    totalSpent: 300000000,
    addresses: (user.userAddresses || [])
      .sort((a, b) => (a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1))
      .map(addr => ({
        addressId: addr._id,
        isDefault: addr.isDefault,
        street: addr.street,
        ward: addr.ward,
        district: addr.district,
        city: addr.city,
        country: addr.country,
        Address: `${addr.street}, ${addr.ward}, ${addr.district}, ${addr.city}, ${addr.country}`
      }))
  }));

  return { users, total };
};

export const getUser = async (id) => {
  if (!id) throw new Error("USER_ID_REQUIRED");
  const [user, rawAddresses] = await Promise.all([
    User.findById(id).select("-hashedPassword").lean(),
    Address.find({ userId: id }).sort({ isDefault: -1, createdAt: -1 }).lean()
  ]);
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
    avatar: user.avatar?.url || null,
    orderCount: 5,
    totalSpent: 300000000,
    addresses: rawAddresses.map(addr => ({
      addressId: addr._id,
      isDefault: addr.isDefault,
      street: addr.street,
      ward: addr.ward,
      district: addr.district,
      city: addr.city,
      country: addr.country,
      Address: `${addr.street}, ${addr.ward}, ${addr.district}, ${addr.city}, ${addr.country}`
    }))
  };
};

export const updateUser = async (
  id,
  { email, displayName, phone, role, status },
  fileBuffer
) => {
  if (!id) throw new Error("USER_ID_REQUIRED");

  const updateData = {
    email,
    displayName,
    phone,
    role,
    status,
  };

  if (fileBuffer) {
    const imageResult = await uploadImageToCloudinary(
      fileBuffer.buffer,
      "users"
    );
    
    updateData.avatar = {
      url: imageResult.url,
      publicId: imageResult.publicId,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  )
    .select("-password -hashedPassword")
    .lean();

  if (!updatedUser) throw new Error("USER_NOT_FOUND");

  return {
    userId: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    displayName: updatedUser.displayName,
    phone: updatedUser.phone,
    role: updatedUser.role,
    status: updatedUser.status,
    avatar: updatedUser.avatar?.url || null,
    updatedAt: updatedUser.updatedAt,
  };
};