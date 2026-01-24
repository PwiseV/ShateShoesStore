// controllers/contactController.ts
import * as contactService from "../services/contact.service.js";

export const submitContact = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, message } = req.body;

    // 1. Validation cơ bản (Nên dùng Joi hoặc Zod để chuyên nghiệp hơn)
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ các thông tin bắt buộc.",
      });
    }

    // 2. Gọi service để lưu database
    const contact = await contactService.createContact({
      firstName,
      lastName,
      phone,
      email,
      message,
    });

    // 3. Trả về phản hồi thành công
    return res.status(201).json({
      success: true,
      message: "Gửi thông tin liên hệ thành công!",
      data: contact,
    });
  } catch (error) {
    console.error("Contact Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra tại hệ thống. Vui lòng thử lại sau.",
      error: error.message,
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Lỗi hệ thống",
    });
  }
};