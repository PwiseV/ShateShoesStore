import mongoose from "mongoose";
import ProductSizeVariant from "./ProductSizeVariant.js";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      strict: true,
    },
    description: {
      type: String,
      default: "",
    },
    tag: {
      type: [String],
      default: [],
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
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
  },
  {
    timestamps: true,
  }
);

productSchema.pre("findOneAndDelete", async function (next) {
  const product = await this.model.findOne(this.getFilter());
  if (!product) return next();

  const sizes = await ProductSizeVariant.find({
    productId: product._id,
  });

  for (const size of sizes) {
    await ProductSizeVariant.findByIdAndDelete(size._id);
  }

  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
