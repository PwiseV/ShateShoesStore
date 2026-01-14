import mongoose from "mongoose";

const addressSChema = new mongoose.Schema(
  {
    isDefault: {
      type: Boolean,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    ward: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
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


addressSChema.index(
  { userId: 1, isDefault: 1 },
  { 
    unique: true, 
    partialFilterExpression: { isDefault: true } 
  }
);

const Address = mongoose.model("Address", addressSChema);

export default Address;
