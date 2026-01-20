import * as addressService from "../services/address.service.js";

export const getUserAddresses = async (req, res) => {
  try {
    const { id } = req.params;
    const addresses = await addressService.getUserAddresses(id);

    return res.status(200).json({
      success: true,
      message: "Fetch user addresses success",
      data: addresses,
    });
  } catch (error) {
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createUserAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { street, ward, district, city, country, isDefault } = req.body;
    const addresses = await addressService.createUserAddress(id, {
      street,
      ward,
      district,
      city,
      country,
      isDefault,
    });
    return res.status(200).json({
      success: true,
      message: "Create user addresses success",
      data: addresses,
    });
  } catch (error) {
    if (error.message === "MISSING_REQUIRED_FIELDS") {
      return res.status(400).json({ message: "Missing requires fields" });
    }
    if (error.message === "USER_NOT_FOUND") {
      return res.status(400).json({ message: "User not found" });
    }
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUserAddress = async (req, res) => {
  try {
    const { id, addressId } = req.params;
    const { street, ward, district, city, country, isDefault } = req.body;
    const addresses = await addressService.updateUserAddress(addressId, id, {
      street,
      ward,
      district,
      city,
      country,
      isDefault,
    });
    return res.status(200).json({
      success: true,
      message: "Update user addresses success",
      data: addresses,
    });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(400).json({ message: "User not found" });
    }
    if (error.message === "ADDRESS_NOT_FOUND") {
      return res.status(400).json({ message: "User address not found" });
    }
    if (error.message === "CANNOT_UNSET_DEFAULT_ADDRESSD") {
      return res
        .status(400)
        .json({ message: "There's only one default address" });
    }
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteUserAddress = async (req, res) => {
  try {
    const { id, addressId } = req.params;
    const addresses = await addressService.deleteUserAddress(addressId, id);
    return res.status(200).json({
      success: true,
      message: "Delete user addresses success",
      data: addresses,
    });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(400).json({ message: "User not found" });
    }
    if (error.message === "ADDRESS_NOT_FOUND") {
      return res.status(400).json({ message: "User address not found" });
    }
    if (error.message === "CANNOT_UNSET_DEFAULT_ADDRESSD") {
      return res
        .status(400)
        .json({ message: "There's only one default address" });
    }
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
