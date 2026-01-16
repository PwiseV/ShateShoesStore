import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: [
        "pending",     // mới tạo
        "paid",        // đã thanh toán
        "processing",  // đang xử lý
        "shipped",     // đã gửi hàng
        "delivered",   // đã giao
        "cancelled",   // đã hủy
      ],
      default: "pending",
    },

    shippingFee: {
      type: Number,
      required: true,
      default: 30,
    },

    total: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    note: {
      type: String,
    },

    paidAt: {
      type: Date,
    },

    shippedAt: {
      type: Date,
    },

    deliveredAt: {
      type: Date,
    },

    promotionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Promotion",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    paymentMethod: {
      enum: ["COD", "Banking"], // enable more methods later
      type: String,
      default: "COD",
      required: true,       // update later in user-order flow      
},
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

orderSchema.index(
  { userId: 1, promotionId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      promotionId: { $exists: true },
    },
  }
);


export default mongoose.model("Order", orderSchema);
