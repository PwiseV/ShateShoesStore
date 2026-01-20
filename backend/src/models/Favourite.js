import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

favouriteSchema.index(
  { userId: 1, productId: 1 }, 
  { 
    unique: true, 
  }
);

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;