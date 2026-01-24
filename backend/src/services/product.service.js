import Product from "../models/Product.js";
import Category from "../models/Category.js";
import ProductVariant from "../models/ProductVariant.js";
import ProductVariantImage from "../models/ProductVariantImage.js";
import Favourite from "../models/Favourite.js";
import slugify from "slugify";
import { uploadImageToCloudinary } from "./cloudinary.service.js";
import { deleteImageFromCloudinary } from "./cloudinary.service.js";

export const createProduct = async ({
  code,
  title,
  description,
  categoryName,
  tag,
  fileBuffer,
}) => {
  const existProductCode = await Product.findOne({ code });
  if (existProductCode) throw new Error("PRODUCT_CODE_EXISTS");


  const categoryDoc = await Category.findOne({ name: categoryName });
  if (!categoryDoc) throw new Error("CATEGORY_NOT_FOUND");

  const slug = slugify(title, {
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });
  const existSlug = await Product.findOne({ slug });
  if (existSlug) throw new Error("SLUG_EXISTS");

  const imageResult = await uploadImageToCloudinary(fileBuffer, "products");

  return await Product.create({
    code,
    title,
    description,
    categoryId: categoryDoc._id,
    slug,
    tag: tag,
    avatar: {
      url: imageResult.url,
      publicId: imageResult.publicId,
    },
  });
};

export const createVariant = async ({
  productId,
  color,
  size,
  price,
  stock,
  fileBuffer,
}) => {
  if (price < 0 || stock < 0) {
    throw new Error("INVALID_INPUT");
  }

  try {
    const parentProduct = await Product.findById(productId);
    if (!parentProduct) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    let imageProduct = null;
    imageProduct = await ProductVariantImage.findOne({
      productId: productId,
      color: color,
    });

    if (!imageProduct) {
      if (fileBuffer) {
        const imageResult = await uploadImageToCloudinary(
          fileBuffer.buffer,
          "variants"
        );
        imageProduct = await ProductVariantImage.create({
          color,
          productId,
          avatar: {
            url: imageResult.url,
            publicId: imageResult.publicId,
          },
        });
      }
      else {
        throw new Error("IMAGE_REQUIRED_FOR_NEW_COLOR");
      }
    }

    // 2. Tạo SKU và Variant mới
    const sku = `${parentProduct.code}-${color}-${size}`;

    const newVariant = await ProductVariant.create({
      productId,
      sku,
      stock,
      price,
      color,
      size,
      productVariantImageId: imageProduct._id,
    });

    return newVariant;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("VARIANT_ALREADY_EXISTS");
    }
    throw error;
  }
};

export const getProducts = async ({
  page = 1,
  limit = 10,
  category,
  keyword,
}) => {
  const skip = (page - 1) * limit;
  const filter = {};

  if (category && category != "All") {
    const categoryDoc = await Category.findOne({ name: category });
    if (categoryDoc) {
      filter.categoryId = categoryDoc._id;
    } else {
      return { products: [], total: 0 }; 
    }
  }

  if (keyword) {
    filter.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { code: { $regex: keyword, $options: "i" } },
    ];
  }

  const total = await Product.countDocuments(filter);
  const rawProducts = await Product.find(filter)
    .populate({
      path: "categoryId",
      populate: { path: "parentId" },
    })
    .skip(skip)
    .limit(limit)
    .lean();

  const formattedProducts = await Promise.all(
    rawProducts.map(async (product) => {
      const variants = await ProductVariant.find({ productId: product._id })
        .populate("productVariantImageId")
        .lean();

      const sizesMap = {};
      let totalStock = 0;
      let minPrice = variants.length > 0 ? variants[0].price : 0;
      variants.forEach((v) => {
        totalStock += v.stock;

        if (v.price < minPrice) {
          minPrice = v.price;
        }
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
          avatar: v.productVariantImageId?.avatar.url || null,
        });
      });

      return {
        productId: product._id,
        code: product.code,
        title: product.title,
        description: product.description,
        tag: product.tag,
        slug: product.slug,
        avatar: product.avatar.url,
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

  return { products: formattedProducts, total };
};

export const getOneProduct = async ({ id, userId }) => {
  const product = await Product.findById(id)
    .populate({
      path: "categoryId",
      populate: { path: "parentId" },
    })
    .lean();

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  let isFavourite = false;
  if (userId) {
    const favouriteExist = await Favourite.findOne({
      productId: id,
      userId: userId,
    }).lean();
    isFavourite = !!favouriteExist; 
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
  const formattedProduct = {
    productId: product._id,
    code: product.code,
    title: product.title,
    description: product.description,
    tag: product.tag,
    slug: product.slug,
    isFavourite: isFavourite,
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
    sizes: Object.values(sizesMap),
  };

  return formattedProduct; 
};


export const updateProduct = async (id, updateData, fileBuffer) => {
  const { code, title, description, category, tag } = updateData;

  const product = await Product.findById(id);
  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  if (code) {
    const existCode = await Product.findOne({
      code,
      _id: { $ne: id },
    });
    if (existCode) throw new Error("PRODUCT_CODE_EXISTS");

    product.code = code;
  }

  if (category) {
    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) throw new Error("CATEGORY_NOT_FOUND");

    product.categoryId = categoryDoc._id;
  }

  if (title) {
    const slug = slugify(title, {
      lower: true,
      strict: true,
      locale: "vi",
      trim: true,
    });

    const existSlug = await Product.findOne({
      slug,
      _id: { $ne: id },
    });
    if (existSlug) throw new Error("SLUG_EXISTS");

    product.title = title;
    product.slug = slug;
  }

  if (fileBuffer) {
    const imageResult = await uploadImageToCloudinary(
      fileBuffer.buffer,
      "products"
    );
    if (imageResult) {
      product.avatar = {
        publicId: imageResult.publicId,
        url: imageResult.url,
      };
    }
  }

  if (description !== undefined) product.description = description;
  if (tag !== undefined) product.tag = tag;

  await product.save();

  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  if (product.avatar && product.avatar.publicId) {
    await deleteImageFromCloudinary(product.avatar.publicId);
  }

  const variants = await ProductVariant.find({ productId: id }).populate(
    "productVariantImageId"
  );

  for (const variant of variants) {
    const variantImage = variant.productVariantImageId;

    if (variantImage && variant.avatar.publicId) {
      await deleteImageFromCloudinary(variant.avatar.publicId);
      await ProductVariantImage.findByIdAndDelete(variantImage);
    }

    await ProductVariant.findByIdAndDelete(variant._id);
  }
  await Product.findByIdAndDelete(id);

  return true;
};

export const updateVariant = async (id, updateData, fileBuffer) => {
  const { size, color, price, stock } = updateData;
  if (size === undefined && color === undefined) {
    throw new Error("MISSING_UPDATE_FIELDS");
  }

  if (price < 0 || stock < 0) {
    throw new Error("INVALID_INPUT");
  }
  const variant = await ProductVariant.findOne({
    productId: id,
    size,
    color,
  }).populate("productVariantImageId");

  if (!variant) {
    throw new Error("VARIANT_NOT_FOUND");
  }

  if (price !== undefined) variant.price = Number(price);
  if (stock !== undefined) variant.stock = Number(stock);

  if (fileBuffer) {
    let currentImageDoc = await ProductVariantImage.findById(
      variant.productVariantImageId
    );
    const imageResult = await uploadImageToCloudinary(
      fileBuffer.buffer,
      "variants"
    );

    if (imageResult) {
      if (currentImageDoc) {
        if (currentImageDoc.publicId) {
          await deleteImageFromCloudinary(currentImageDoc.avatar.publicId);
        }
        currentImageDoc.avatar.url = imageResult.url;
        currentImageDoc.avatar.publicId = imageResult.publicId;
        await currentImageDoc.save();
      } else {
        const newImage = await ProductVariantImage.create({
          color: variant.color,
          productId: variant.productId,
          avatar: {
            url: imageResult.url,
            publicId: imageResult.publicId,
          },
        });
        variant.productVariantImageId = newImage._id;
      }
    }
  }

  await variant.save();
  return await ProductVariant.findById(variant._id).populate(
    "productVariantImageId"
  );
};

export const deleteProductVariant = async ({ productId, size, color }) => {
  const variant = await ProductVariant.findOne({
    productId,
    size,
    color,
  }).populate("productVariantImageId");

  if (!variant) {
    throw new Error("VARIANT_NOT_FOUND");
  }

  if (
    variant.productVariantImageId &&
    variant.productVariantImageId.avatar.publicId
  ) {
    await deleteImageFromCloudinary(
      variant.productVariantImageId.avatar.publicId
    );

    await ProductVariantImage.findByIdAndDelete(
      variant.productVariantImageId._id
    );
  }

  // 4. Xóa bản ghi trong bảng ProductVariant
  await ProductVariant.findByIdAndDelete(variant._id);

  return true;
};
