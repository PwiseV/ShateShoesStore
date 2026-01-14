import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariant",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    // lưu giá tại thời điểm mua
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
orderItemSchema.index(
  { orderId: 1, variantId: 1 },
  { unique: true }
);

export default mongoose.model("OrderItem", orderItemSchema);
