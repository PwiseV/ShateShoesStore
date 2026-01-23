
import * as reviewService from "../services/review.service.js";

import Review from "../models/Review.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// GET /api/users/reviews/order-item/:orderItemId
// Get info to write a review
export const getProductForReview = async (req, res) => {
    try {
        const { orderItemId } = req.params;
        const userId = req.user._id;

        // 1. Find OrderItem and populate Variant -> Product
        const orderItem = await OrderItem.findById(orderItemId).populate({
            path: "variantId",
            populate: { path: "productId", select: "title avatar" }
        });

        if (!orderItem) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm trong đơn hàng" });
        }

        const variant = orderItem.variantId;
        if (!variant) {
            // Variant deleted? handle gracefully
            return res.status(404).json({ message: "Sản phẩm biến thể không tồn tại" });
        }
        const product = variant.productId; // Populated above
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        res.status(200).json({
            success: true,
            data: {
                orderItemId: orderItem._id,
                productId: product._id,
                productTitle: product.title,
                productImage: product.avatar?.url || "",
                color: variant.color,
                size: variant.size,
            }
        });

    } catch (error) {
        console.error("Error getProductForReview:", error);
        res.status(500).json({ message: "Lỗi Server" });
    }
};

// POST /api/users/reviews
export const createReview = async (req, res) => {
    try {
        const { orderItemId, productId, rating, content, color, size } = req.body;
        const userId = req.user._id;

        // 1. Check if review already exists
        const existing = await Review.findOne({ orderItemId });
        if (existing) {
            return res.status(400).json({ message: "Bạn đã đánh giá sản phẩm này rồi!" });
        }

        // 2. Create Review
        const newReview = new Review({
            userId,
            productId,
            orderItemId,
            rating,
            content,
            color,
            size
        });

        await newReview.save();

        // Optional: Update Product average rating
        // await updateProductRating(productId);

        res.status(201).json({
            success: true,
            message: "Đánh giá thành công!",
            data: newReview
        });

    } catch (error) {
        console.error("Error createReview:", error);
        res.status(500).json({ message: "Lỗi Server" });
    }
};

// GET /api/users/reviews/product/:productId
export const getReviewsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId })
            .populate("userId", "displayName avatar email") // Get reviewer info
            .sort({ createdAt: -1 });

        // Transform to FE format if needed or send as is
        // FE Review type: { reviewId, author, rating, content, createdAt, size, color }

        const formattedReviews = reviews.map(r => ({
            reviewId: r._id,
            author: r.userId?.displayName || "Người dùng ẩn danh", // Use displayName from User model
            rating: r.rating,
            content: r.content,
            createdAt: r.createdAt,
            size: r.size,
            color: r.color,
            productVariant: "" // Optional
        }));

        res.status(200).json({
            success: true,
            data: formattedReviews
        });

    } catch (error) {
        console.error("Error getReviewsByProduct:", error);
        res.status(500).json({ message: "Lỗi Server" });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status;
        const rating =  req.query.rating;
        const { formattedReviews, total } = await reviewService.getAllReviewsService(page, limit, status, rating);

        return res.status(200).json({
            success: true,
            message: "Lấy danh sách đánh giá thành công",
            data: formattedReviews,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error("Lỗi trong getAllReviews:", error);
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi lấy danh sách đánh giá",
            error: error.message
        });
    }
};

export const updateReviewStatus = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { status } = req.body;

        if (!["active", "hidden"].includes(status)) {
            return res.status(400).json({ success: false, message: "Trạng thái không hợp lệ" });
        }

        const data = await reviewService.updateReviewStatusService(reviewId, status);
        
        return data 
            ? res.status(200).json({ success: true, message: "Cập nhật thành công", data })
            : res.status(404).json({ success: false, message: "Không tìm thấy đánh giá" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi hệ thống", error: error.message });
    }
};