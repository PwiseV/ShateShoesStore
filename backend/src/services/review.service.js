import Review from "../models/Review.js";

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