import {
  addFavourite,
  removeFavourite,
} from "../services/favourite.service.js";

export const addToFavourite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId là bắt buộc" });
    }

    const favourite = await addFavourite(userId, productId);

    return res.status(201).json({
      message: "Đã thêm vào yêu thích",
      data: favourite,
    });
  } catch (error) {
    if (error.message === "PRODUCT_ALREADY_IN_FAVOURITE") {
      return res.status(409).json({
        message: "Sản phẩm đã có trong yêu thích",
      });
    }

    return res.status(500).json({
      message: "Thêm vào yêu thích thất bại",
      error: error.message,
    });
  }
};

export const removeFavouriteFrom = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    const favourite = await removeFavourite(userId, productId);

    return res.status(200).json({
      message: "Đã xóa khỏi yêu thích",
      data: favourite,
    });
  } catch (error) {
    if (error.message === "FAVOURITE_NOT_FOUND") {
      return res.status(404).json({
        message: "Không tìm thấy trong yêu thích",
      });
    }

    return res.status(500).json({
      message: "Xóa khỏi yêu thích thất bại",
      error: error.message,
    });
  }
};
