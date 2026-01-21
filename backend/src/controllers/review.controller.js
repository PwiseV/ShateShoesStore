// src/controllers/review.controller.js
import * as reviewService from "../services/review.service.js";

export const getReviewForm = async (req, res) => {
  try {
    const { orderItemId } = req.params;
    const data = await reviewService.getReviewFormData({
      orderItemId,
      userId: req.user.id,
    });

    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const submitReview = async (req, res) => {
  try {
    const review = await reviewService.createReview({
      userId: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      message: "Gửi đánh giá thành công",
      reviewId: review._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
