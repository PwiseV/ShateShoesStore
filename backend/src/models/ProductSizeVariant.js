import mongoose from "mongoose";
import ProductColorVariant from "./ProductColorVariant.js";

const productSizeVariantSchema = new mongoose.Schema(
  {
    size: {
      type: String,      
      required: true,
      trim: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSizeVariantSchema.pre(
  "findOneAndDelete",
  async function (next) {
    const size = await this.model.findOne(this.getFilter());
    if (!size) return next();

    await ProductColorVariant.deleteMany({
      sizeId: size._id,
    });

    next();
  }
);

/* 
  Một product không được có 2 size giống nhau
*/
productSizeVariantSchema.index(
  { productId: 1, size: 1 },
  { unique: true }
);

const ProductSizeVariant = mongoose.model(
  "ProductSizeVariant",
  productSizeVariantSchema
);

export default ProductSizeVariant;
