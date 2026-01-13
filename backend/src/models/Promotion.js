import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountAmount: {
        type: Number,   
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    minOrderAmount: {
        type: Number,
        required: true,
    },
    active: {
        type: String,
        required: true,
        enum: ["upcoming","active", "inactive", "expired"],
    },
    expiredAt: {
        type: Date,
        required: true,
    },
    startedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Promotion = mongoose.model("Promotion", promotionSchema);

export default Promotion;