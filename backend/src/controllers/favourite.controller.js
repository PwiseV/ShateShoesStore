import {
  addFavourite,
  removeFavourite,
} from "../services/favourite.service.js";

export const addToFavourite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const favourite = await addFavourite(userId, productId);

    return res.status(201).json({
      message: "Added to favourite",
      data: favourite,
    });
  } catch (error) {
    if (error.message === "PRODUCT_ALREADY_IN_FAVOURITE") {
      return res.status(409).json({
        message: "Product already in favourite",
      });
    }

    return res.status(500).json({
      message: "Failed to add favourite",
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
      message: "Removed from favourite",
      data: favourite,
    });
  } catch (error) {
    if (error.message === "FAVOURITE_NOT_FOUND") {
      return res.status(404).json({
        message: "Favourite not found",
      });
    }

    return res.status(500).json({
      message: "Failed to remove favourite",
      error: error.message,
    });
  }
};
