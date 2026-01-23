import CartItem from "../models/CartItem.js";
import ProductVariant from "../models/ProductVariant.js";
import Product from "../models/Product.js";

export const addToCart = async ({ userId, variantId, quantity }) => {
  const variant = await ProductVariant.findById(variantId);
  if (!variant) {
    throw new Error("VARIANT_NOT_FOUND");
  }
  if (variant.stock < quantity) {
    throw new Error("NOT_ENOUGH_STOCK");
  }

  const existingItem = await CartItem.findOne({ userId, variantId });

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    if (variant.stock < newQuantity) {
      throw new Error("TOTAL_EXCEEDS_STOCK");
    }

    existingItem.quantity = newQuantity;
    return await existingItem.save();
  }

  return await CartItem.create({
    userId,
    variantId,
    quantity,
  });
};

export const getCart = async (userId) => {
  const items = await CartItem.find({ userId })
    .populate({
      path: "variantId",
      populate: {
        path: "productId",
        select: "title avatar code description categoryId",
      },
    })
    .sort({ createdAt: -1 });

  const cartData = await Promise.all(
    items.map(async (item) => {
      const variant = item.variantId;
      
      // Kiểm tra variant có tồn tại không
      if (!variant) {
        console.warn(`Variant not found for cart item ${item._id}`);
        return null; // Sẽ filter ra sau
      }

      const product = variant.productId;
      
      // Kiểm tra product có tồn tại không
      if (!product) {
        console.warn(`Product not found for variant ${variant._id}`);
        return null; // Sẽ filter ra sau
      }
      
      let currentQty = item.quantity;
      let needsUpdate = false;

      if (variant.stock <= 0) {
        currentQty = 0;
        needsUpdate = item.quantity !== 0;
      } else if (item.quantity > variant.stock) {
        currentQty = variant.stock;
        needsUpdate = true;
      }

      if (needsUpdate) {
        item.quantity = currentQty;
        await item.save();
      }

      const variants = await ProductVariant.find({ productId: product._id })
        .populate("productVariantImageId")
        .lean();

      const sizesMap = {};
      let totalStock = 0;

      variants.forEach((v) => {
        totalStock += v.stock;
        if (!sizesMap[v.size]) {
          sizesMap[v.size] = {
            size: v.size,
            colors: [],
          };
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
        cartItemId: item._id,
        variantId: variant._id,
        quantity: currentQty,
        size: variant.size,
        color: variant.color,
        price: variant.price,
        stock: variant.stock,
        avatar: variant.productVariantImageId?.avatar?.url || product.avatar?.url,
        isOutOfStock: variant.stock <= 0,
        isAdjust: needsUpdate,
        product: {
          productId: product._id,
          code: product.code,
          title: product.title,
          description: product.description,
          tag: product.tag,
          slug: product.slug,
          avatar: product.avatar?.url,
          sizes: Object.values(sizesMap),
        },
      };
    }),
  );

  // Filter out null items (invalid cart items)
  return cartData.filter(item => item !== null);
};

export const updateQuantity = async ({
  userId,
  cartItemId,
  quantity,
  variantId,
}) => {
  const item = await CartItem.findOne({ _id: cartItemId, userId });
  if (!item) {
    throw new Error("CART_ITEM_NOT_FOUND");
  }
  
  // Nếu đổi variant, kiểm tra xem variant mới có tồn tại không
  let targetVariantId = item.variantId;
  if (variantId && variantId.toString() !== item.variantId.toString()) {
    const existingOtherItem = await CartItem.findOne({
      userId,
      variantId,
      _id: { $ne: cartItemId },
    });

    if (existingOtherItem) {
      throw new Error("VARIANT_ALREADY_IN_CART");
    }
    
    targetVariantId = variantId;
  }

  // Kiểm tra stock của variant (có thể là variant cũ hoặc mới)
  const variant = await ProductVariant.findById(targetVariantId);
  if (!variant) {
    throw new Error("VARIANT_NOT_FOUND");
  }
  
  if (variant.stock < quantity) {
    throw new Error("NOT_ENOUGH_STOCK");
  }
  
  // Cập nhật
  if (variantId) {
    item.variantId = variantId;
  }
  item.quantity = quantity;

  return await item.save();
};

/**
 * Xóa sản phẩm khỏi giỏ hàng
 */
export const removeFromCart = async (userId, cartItemId) => {
  const result = await CartItem.findOneAndDelete({ _id: cartItemId, userId });
  if (!result) {
    throw new Error("CART_ITEM_NOT_FOUND");
  }
  return result;
};
