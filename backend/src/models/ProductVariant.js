import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
      default: null,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    color: {
      type: String,
      default: "",
      index: true,
    },
    size: {
      type: String,
      required: true,
      index: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    productVariantImageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariantImage",
    },
  },
  {
    timestamps: true,
  }
);

productVariantSchema.index(
  { color: 1, size: 1, productId: 1 }, 
  { 
    unique: true, 
    partialFilterExpression: { sku: { $ne: null } } 
  }
);

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);

export default ProductVariant;