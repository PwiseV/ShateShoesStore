import * as addressService from "../services/address.service.js";

export const getUserAddresses = async (req, res) => {
  try {
    const id = req.user._id;
    const addresses = await addressService.getUserAddresses(id);

    return res.status(200).json({
      success: true,
      message: "Lấy danh sách địa chỉ thành công",
      data: addresses,
    });
  } catch (error) {
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const createUserAddress = async (req, res) => {
  try {
    const id = req.user._id;
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
      message: "Tạo địa chỉ thành công",
      data: addresses,
    });
  } catch (error) {
    if (error.message === "MISSING_REQUIRED_FIELDS") {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }
    if (error.message === "USER_NOT_FOUND") {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateUserAddress = async (req, res) => {
  try {
    const id = req.user._id;
    const { addressId } = req.params;
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
      message: "Cập nhật địa chỉ thành công",
      data: addresses,
    });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }
    if (error.message === "ADDRESS_NOT_FOUND") {
      return res.status(400).json({ message: "Địa chỉ không tồn tại" });
    }
    if (error.message === "CANNOT_UNSET_DEFAULT_ADDRESSD") {
      return res
        .status(400)
        .json({ message: "Chỉ có một địa chỉ mặc định" });
    }
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteUserAddress = async (req, res) => {
  try {
    const id = req.user._id;
    const { addressId } = req.params;
    const addresses = await addressService.deleteUserAddress(addressId, id);
    return res.status(200).json({
      success: true,
      message: "Xóa địa chỉ thành công",
      data: addresses,
    });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }
    if (error.message === "ADDRESS_NOT_FOUND") {
      return res.status(400).json({ message: "Địa chỉ không tồn tại" });
    }
    if (error.message === "CANNOT_UNSET_DEFAULT_ADDRESSD") {
      return res
        .status(400)
        .json({ message: "Chỉ có một địa chỉ mặc định" });
    }
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
