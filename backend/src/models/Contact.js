import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Vui lòng nhập tên"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Vui lòng nhập họ"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Vui lòng nhập số điện thoại"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"],
    },
    message: {
      type: String,
      required: [true, "Vui lòng nhập nội dung tin nhắn"],
      trim: true,
    },
    // Ghi chú nội bộ của Admin khi xử lý
    adminNote: {
      type: String,
      default: "",
    }
  },
  {
    // Tự động tạo createdAt và updatedAt
    timestamps: true, 
  }
);

// Index để tìm kiếm theo email nhanh hơn nếu sau này danh sách liên hệ lớn
contactSchema.index({ email: 1, createdAt: -1 });

export default mongoose.model("Contact", contactSchema);