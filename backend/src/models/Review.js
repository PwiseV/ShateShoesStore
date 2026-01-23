
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        orderItemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderItem",
            required: true,
            unique: true, // One review per purchase item
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        color: {
            type: String,
        },
        size: {
            type: String,
        },
        likes: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["pending","active","hidden"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

// Indexes
reviewSchema.index({ productId: 1, createdAt: -1 }); // For fetching reviews of a product sorted by date

const Review = mongoose.model("Review", reviewSchema);

export default Review;
