import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      trim: true,
    },

    content: {
      type: String,
      trim: true,
      required: true,
    },

    // snapshot từ orderItem
    color: String,
    size: String,

    // FK
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    orderItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
      unique: true, // 1 orderItem chỉ review 1 lần
    },

    status: {
      type: String,
      enum: ["approved", "hidden"],
      default: "hidden", // admin duyệt thì mới hiện duyệt - ẩn
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
