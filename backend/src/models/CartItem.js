import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    colorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductColorVariant",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

export default CartItem;
