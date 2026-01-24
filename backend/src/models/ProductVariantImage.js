import mongoose from "mongoose";

const productVariantImageSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    avatar: {
      url: {
      type: String,
    },
      publicId: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ProductVariantImage = mongoose.model("ProductVariantImage", productVariantImageSchema);

export default ProductVariantImage;
