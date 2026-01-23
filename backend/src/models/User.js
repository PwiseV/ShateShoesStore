import mongoose from "mongoose";

const userSChema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: false,
    },
    hashedPassword: {
      type: String,
      required: false, 
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    avatar: {
      url: {
        required: true,
        type: String,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
    status: {
        enum: ["active", "blocked"],
        type: String,
        default: "active",
    },
    phone: {
      type: String,
      sparse: true,
    },
    authType: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
}, {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSChema);

export default User;
