import mongoose from "mongoose";
import Address from "../models/Address.js";
import User from "../models/User.js";

export const getUserAddresses = async (userId) => {
  if (!userId) throw new Error("USER_ID_REQUIRED");
  const filter = { userId: userId };

  const [rawAddresses, total] = await Promise.all([
    Address.find(filter).sort({ isDefault: -1, createdAt: -1 }).lean(),
    Address.countDocuments(filter),
  ]);
  const addresses = rawAddresses.map((addr) => ({
    addressId: addr._id,
    isDefault: addr.isDefault,
    street: addr.street,
    ward: addr.ward,
    district: addr.district,
    city: addr.city,
    country: addr.country,
    Address: `${addr.street}, ${addr.ward}, ${addr.district}, ${addr.city}, ${addr.country}`,
  }));

  return addresses;
};

export const createUserAddress = async (
  userId,
  { street, ward, district, city, country, isDefault }
) => {
  if (!street || !ward || !district || !city || !country) {
    throw new Error("MISSING_REQUIRED_FIELDS");
  }

  // Khởi tạo session để bắt đầu Transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error("USER_NOT_FOUND");

    const existingAddressesCount = await Address.countDocuments({
      userId,
    }).session(session);

    let finalIsDefault = isDefault;

    if (finalIsDefault === true) {
      await Address.updateMany(
        { userId: userId },
        { $set: { isDefault: false } },
        { session }
      );
    } else {
      if (existingAddressesCount === 0) {
        finalIsDefault = true;
      }
    }

    const [newAddress] = await Address.create(
      [
        {
          userId,
          street,
          ward,
          district,
          city,
          country,
          isDefault: finalIsDefault,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    // return newAddress;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    // Luôn luôn kết thúc session
    session.endSession();
  }
};

export const updateUserAddress = async (
  addressId,
  userId,
  { street, ward, district, city, country, isDefault }
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error("USER_NOT_FOUND");

    const currentAddress = await Address.findOne({ _id: addressId, userId }).session(session);
    if (!currentAddress) throw new Error("ADDRESS_NOT_FOUND");

    let finalIsDefault = isDefault === true;

    if (finalIsDefault) {
      await Address.updateMany(
        { userId: userId, _id: { $ne: addressId } },
        { $set: { isDefault: false } },
        { session }
      );
    } 
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { street, ward, district, city, country, isDefault: finalIsDefault },
      { new: true, runValidators: true, session } // Thêm session vào đây
    ).lean();

    await session.commitTransaction();

    return {
      addressId: updatedAddress._id,
      street: updatedAddress.street,
      ward: updatedAddress.ward,
      district: updatedAddress.district,
      city: updatedAddress.city,
      country: updatedAddress.country,
      isDefault: updatedAddress.isDefault,
      fullAddress: `${updatedAddress.street}, ${updatedAddress.ward}, ${updatedAddress.district}, ${updatedAddress.city}`,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const deleteUserAddress = async (addressId, userId) => {
  const addressToDelete = await Address.findOne({ _id: addressId, userId });
  if (!addressToDelete) {
    throw new Error("ADDRESS_NOT_FOUND");
  }
  if (addressToDelete.isDefault) {
    const anotherAddress = await Address.findOne({
      userId,
      _id: { $ne: addressId },
    }).sort({ createdAt: -1 });

    if (anotherAddress) {
      anotherAddress.isDefault = true;
      await anotherAddress.save();
    }
  }

  await Address.findByIdAndDelete(addressId);
  return addressToDelete;
};
