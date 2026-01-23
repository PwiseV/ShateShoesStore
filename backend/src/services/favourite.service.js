import Favourite from "../models/Favourite.js";
import ProductVariant from "../models/ProductVariant.js";

export const getAllFavourites = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  // 1. Lấy danh sách yêu thích
  const favourites = await Favourite.find({ userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "productId",
      populate: {
        path: "categoryId",
        populate: { path: "parentId" },
      },
    })
    .lean();

  // 2. Lọc bỏ sản phẩm null (đã bị xóa khỏi DB)
  const validFavourites = favourites.filter((fav) => fav.productId);
  
  // 3. Tính tổng dựa trên danh sách hợp lệ
  const total = validFavourites.length;

  // 4. Phân trang mảng sau khi lọc
  const paginatedFavourites = validFavourites.slice(skip, skip + limit);

  // 5. Format dữ liệu chi tiết
  const formattedFavourites = await Promise.all(
    paginatedFavourites.map(async (fav) => {
      const product = fav.productId;
      const variants = await ProductVariant.find({ productId: product._id })
        .populate("productVariantImageId")
        .lean();

      const sizesMap = {};
      let totalStock = 0;
      let minPrice = variants.length > 0 ? variants[0].price : 0;

      variants.forEach((v) => {
        totalStock += v.stock;
        if (v.price < minPrice) minPrice = v.price;

        if (!sizesMap[v.size]) {
          sizesMap[v.size] = { size: v.size, colors: [] };
        }

        sizesMap[v.size].colors.push({
          variantId: v._id,
          color: v.color,
          price: v.price,
          stock: v.stock,
          avatar: v.productVariantImageId?.avatar?.url || null,
        });
      });

      return {
        favouriteId: fav._id,
        productId: product._id,
        code: product.code,
        title: product.title,
        description: product.description,
        tag: product.tag,
        slug: product.slug,
        avatar: product.avatar?.url,
        category: {
          categoryId: product.categoryId?._id,
          name: product.categoryId?.name,
          slug: product.categoryId?.slug,
          parent: product.categoryId?.parentId
            ? {
                categoryId: product.categoryId.parentId._id,
                name: product.categoryId.parentId.name,
                slug: product.categoryId.parentId.slug,
              }
            : null,
        },
        stock: totalStock,
        rating: 5,
        min_price: minPrice,
        sizes: Object.values(sizesMap),
      };
    })
  );

  return {
    formattedFavourites,
    total,
  };
};

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
