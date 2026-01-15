import * as userService from "../services/address.service.js";

export const getUserAddresses = async (req, res) => {
  try {
    const { id } = req.params;
    const addresses = await addressService.getUserAddresses({
        id
    });

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

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await userService.getUser({
      id,
    });

    return res.status(200).json({
      success: true,
      message: "Fetch users success",
      data: users,
    });
  } catch (error) {
    if (error.message === "USER_ID_REQUIRED") {
      return res.status(400).json({ message: "Missing requires fields" });
    }
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "User not found" });
    }
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, displayName, phone, role, status } = req.body;
    const users = await userService.updateUser(
      id,
      {
        email,
        displayName,
        phone,
        role,
        status,
      },
      req.file
    );

    return res.status(200).json({
      success: true,
      message: "Update users success",
      data: users,
    });
  } catch (error) {
    if (error.message === "USER_ID_REQUIRED") {
      return res.status(400).json({ message: "Missing requires fields" });
    }
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "User not found" });
    }
    console.error("Get users controller error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
