import Address from "../models/Address.js";

export const getUserAddresses = async (userId) => {
  if (!userId) throw new Error("USER_ID_REQUIRED");
  const filter = { userId: userId };

  const [rawAddresses, total] = await Promise.all([
    Address.find(filter)
      .sort({ isDefault: -1, createdAt: -1 })
      .lean(),
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
    fullAddress: `${addr.street}, ${addr.ward}, ${addr.district}, ${addr.city}`,
  }));

  return addresses;
};