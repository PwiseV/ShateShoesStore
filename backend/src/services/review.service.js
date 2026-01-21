// src/services/review.service.js
import Review from "../models/Review.js";
import OrderItem from "../models/OrderItem.js";
import Order from "../models/Order.js";
import ProductVariant from "../models/ProductVariant.js";
import Product from "../models/Product.js";
import ProductVariantImage from "../models/ProductVariantImage.js";

/**
 * GET data để render form review
 */
export const getReviewFormData = async ({ orderItemId, userId }) => {
  const orderItem = await OrderItem.findById(orderItemId);
  if (!orderItem) {
    throw new Error("Order item không tồn tại");
  }

  const order = await Order.findById(orderItem.orderId);
  if (!order || order.userId.toString() !== userId.toString()) {
    throw new Error("Không có quyền đánh giá đơn hàng này");
  }

  if (order.status !== "delivered") {
    throw new Error("Đơn hàng chưa được giao");
  }

  const existedReview = await Review.findOne({ orderItemId });
  if (existedReview) {
    throw new Error("Bạn đã đánh giá sản phẩm này rồi");
  }

  const variant = await ProductVariant.findById(orderItem.variantId);
  const product = await Product.findById(variant.productId);
  const variantImage = await ProductVariantImage.findOne({
    productId: product._id,
    color: variant.color,
  });

  return {
    orderItemId,
    productId: product._id,
    productTitle: product.title,
    productImage: variantImage?.avatar?.url || product.avatar.url,
    color: variant.color,
    size: variant.size,
  };
};

/**
 * CREATE review
 */
export const createReview = async ({
  userId,
  orderItemId,
  productId,
  rating,
  title,
  content,
}) => {
  const orderItem = await OrderItem.findById(orderItemId);
  if (!orderItem) {
    throw new Error("Order item không tồn tại");
  }

  const order = await Order.findById(orderItem.orderId);
  if (!order || order.userId.toString() !== userId.toString()) {
    throw new Error("Không có quyền đánh giá đơn hàng này");
  }

  if (order.status !== "delivered") {
    throw new Error("Đơn hàng chưa được giao");
  }

  const existedReview = await Review.findOne({ orderItemId });
  if (existedReview) {
    throw new Error("Bạn đã đánh giá sản phẩm này rồi");
  }

  const variant = await ProductVariant.findById(orderItem.variantId);

  const review = await Review.create({
    rating,
    title,
    content,
    color: variant.color,
    size: variant.size,
    userId,
    productId,
    orderItemId,
    status: "hidden", // mặc định chờ admin duyệt
  });

  return review;
};
