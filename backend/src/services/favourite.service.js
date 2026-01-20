import Favourite from "../models/Favourite.js";

export const addFavourite = async (userId, productId) => {
  try {
    const favourite = await Favourite.create({
      userId,
      productId,
    });

    return favourite;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("PRODUCT_ALREADY_IN_FAVOURITE");
    }
    throw error;
  }
};

export const removeFavourite = async (userId, productId) => {
  const result = await Favourite.findOneAndDelete({
    userId,
    productId,
  });

  if (!result) {
    throw new Error("FAVOURITE_NOT_FOUND");
  }

  return result;
};
