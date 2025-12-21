import mongoose from "mongoose";

const productColorVariantSchema = new mongoose.Schema(
  {
    sizeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductSizeVariant",
      required: true,
      index: true,
    },

    // sku: {
    //   type: String,
    //   // required: true,
    //   unique: true,
    //   trim: true,
    //   uppercase: true,
    // },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    variantImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

productColorVariantSchema.index(
  { sizeId: 1, color: 1 },
  { unique: true }
);

const ProductColorVariant = mongoose.model(
  "ProductColorVariant",
  productColorVariantSchema
);

export default ProductColorVariant;
