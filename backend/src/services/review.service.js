import Review from "../models/Review.js";
import OrderItem from "../models/OrderItem.js";

/**
 * Get product information for writing a review
 * @param {string} orderItemId - Order item ID
 * @param {string} userId - User ID (for future authorization check)
 * @returns {Promise<Object>} Product review info
 */
export const getProductForReviewService = async (orderItemId, userId) => {
  // Find OrderItem and populate Variant -> Product
  const orderItem = await OrderItem.findById(orderItemId).populate({
    path: "variantId",
    populate: { path: "productId", select: "title avatar" },
  });

  if (!orderItem) {
    throw new Error("ORDER_ITEM_NOT_FOUND");
  }

  const variant = orderItem.variantId;
  if (!variant) {
    throw new Error("VARIANT_NOT_FOUND");
  }

  const product = variant.productId;
  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  // Optional: Verify that this orderItem belongs to the user
  // const order = await Order.findOne({ _id: orderItem.orderId, userId });
  // if (!order) throw new Error("UNAUTHORIZED");

  return {
    orderItemId: orderItem._id,
    productId: product._id,
    productTitle: product.title,
    productImage: product.avatar?.url || "",
    color: variant.color,
    size: variant.size,
  };
};

/**
 * Create a new review
 * @param {Object} reviewData - Review data
 * @param {string} userId - User ID
 * @returns {Promise<Object>} Created review
 */
export const createReviewService = async (reviewData, userId) => {
  const { orderItemId, productId, rating, content, color, size } = reviewData;

  // Check if review already exists
  const existingReview = await Review.findOne({ orderItemId });
  if (existingReview) {
    throw new Error("REVIEW_ALREADY_EXISTS");
  }

  // Validate rating
  if (rating < 1 || rating > 5) {
    throw new Error("INVALID_RATING");
  }

  // Create review
  const newReview = new Review({
    userId,
    productId,
    orderItemId,
    rating,
    content: content || "",
    color,
    size,
  });

  await newReview.save();

  // TODO: Update product average rating
  // await updateProductAverageRating(productId);

  return newReview;
};

/**
 * Get all reviews for a product
 * @param {string} productId - Product ID
 * @returns {Promise<Array>} List of reviews
 */
export const getReviewsByProductService = async (productId) => {
  const reviews = await Review.find({ productId })
    .populate("userId", "displayName avatar email")
    .sort({ createdAt: -1 });

  // Transform to frontend format
  return reviews.map((review) => ({
    reviewId: review._id,
    author: review.userId?.displayName || "Người dùng ẩn danh",
    rating: review.rating,
    content: review.content,
    createdAt: review.createdAt,
    size: review.size,
    color: review.color,
    productVariant: "", // Optional field
  }));
};

/**
 * Update product average rating (optional helper)
 * @param {string} productId - Product ID
 */
export const updateProductAverageRating = async (productId) => {
  const reviews = await Review.find({ productId });

  if (reviews.length === 0) {
    return;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  // Update Product model with new rating
  // await Product.findByIdAndUpdate(productId, {
  //   rating: {
  //     value: averageRating,
  //     count: reviews.length
  //   }
  // });

  return {
    averageRating,
    totalReviews: reviews.length,
  };
};

export const getAllReviewsService = async (
  page = 1,
  limit = 10,
  status,
  rating,
  keyword
) => {
  const skip = (page - 1) * limit;
  const filter = {};
  if (status) {
    filter.status = status;
  }

  if (rating) {
    filter.rating = parseInt(rating);
  }
  
  if (keyword) {
    filter.content = { $regex: keyword, $options: "i" };
  }

  const reviews = await Review.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "userId",
      select: "username displayName avatar",
    })
    .populate({
      path: "productId",
      select: "title slug avatar",
    })
    .lean();
  const total = await Review.countDocuments(filter);

  const formattedReviews = reviews.map((review) => ({
    reviewId: review._id,
    content: review.content,
    rating: review.rating,
    status: review.status,
    color: review.color,
    size: review.size,
    createdAt: review.createdAt,
    userId: review.userId?._id,
    username: review.userId?.username,
    displayName: review.userId?.displayName,
    avatarUser: review.userId?.avatar?.url || null,
    productId: review.productId?._id,
    title: review.productId?.title,
    slug: review.productId?.slug,
    avatarProduct: review.productId?.avatar?.url || null,
  }));

  return {
    formattedReviews,
    total,
  };
};



export const updateReviewStatusService = async (reviewId, status) => {
    const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        { status: status },
        { new: true, runValidators: true }
    ).populate({
        path: "userId",
        select: "username displayName"
    });

    return updatedReview;
};
