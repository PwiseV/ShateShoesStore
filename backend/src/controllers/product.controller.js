import Product from "../models/Product.js";
import Category from "../models/Category.js";
import ProductSizeVariant from "../models/ProductSizeVariant.js";
import ProductColorVariant from "../models/ProductColorVariant.js";
import slugify from "slugify";

export const createProduct = async (req, res) => {
  try {
    const { productId, title, description, category, avatar, tag } = req.body;

    if (!productId || !title || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existProductId = await Product.findOne({ productId: productId });
    if (existProductId) {
      return res.status(409).json({
        message: "Product ID already exists",
      });
    }

    const categoryDoc = await Category.findOne({ name: category });
    if (!categoryDoc) {
      return res.status(400).json({ message: "Category not found" });
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
      locale: "vi",
      trim: true,
    });

    const existSlug = await Product.findOne({ slug });
    if (existSlug) {
      return res.status(409).json({
        message: "Product title already exists",
      });
    }

    await Product.create({
      productId: productId,
      title,
      description,
      categoryId: categoryDoc._id,
      productImage: avatar,
      slug,
      tag,
    });
    return res.status(201).json({
      message: "Create product success",
    });
  } catch (error) {
    console.error("Create product error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { page = 1, limit = 6, category, keyword } = req.query;

    const filter = {};

    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        filter.categoryId = categoryDoc._id;
      }
    }

    if (keyword) {
      filter.title = { $regex: keyword, $options: "i" };
    }

    const products = await Product.aggregate([
      { $match: filter },

      // category
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

      // parent category
      {
        $lookup: {
          from: "categories",
          localField: "category.parentId",
          foreignField: "_id",
          as: "parentCategory",
        },
      },
      {
        $unwind: {
          path: "$parentCategory",
          preserveNullAndEmptyArrays: true,
        },
      },

      // size
      {
        $lookup: {
          from: "productsizevariants",
          localField: "_id",
          foreignField: "productId",
          as: "sizes",
        },
      },

      // color
      {
        $lookup: {
          from: "productcolorvariants",
          localField: "sizes._id",
          foreignField: "sizeId",
          as: "colors",
        },
      },

      // build sizes -> colors
      {
        $addFields: {
          sizes: {
            $map: {
              input: "$sizes",
              as: "size",
              in: {
                sizeId: "$$size._id",
                size: "$$size.size",
                colors: {
                  $map: {
                    input: {
                      $filter: {
                        input: "$colors",
                        as: "color",
                        cond: {
                          $eq: ["$$color.sizeId", "$$size._id"],
                        },
                      },
                    },
                    as: "color",
                    in: {
                      colorId: "$$color._id",
                      color: "$$color.color",
                      price: "$$color.price",
                      stock: "$$color.stock",
                      avatar: "$$color.variantImage",
                    },
                  },
                },
              },
            },
          },
        },
      },

      // tính tổng stock
      {
        $addFields: {
          stock: { $sum: "$colors.stock" },
        },
      },

      // project
      {
        $project: {
          productId: 1,
          title: 1,
          description: 1,
          productImage: 1,
          stock: 1,
          tag: 1,

          category: {
            categoryId: "$category._id",
            name: "$category.name",
            slug: "$category.slug",
            parent: {
              categoryId: "$parentCategory._id",
              name: "$parentCategory.name",
              slug: "$parentCategory.slug",
            },
          },

          sizes: 1,
        },
      },

      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * Number(limit) },
      { $limit: Number(limit) },
    ]);

    const total = await Product.countDocuments(filter);

    return res.status(200).json({
      data: products.map((p) => ({
        id: p._id,
        productId: p.productId,
        title: p.title,
        description: p.description,
        avatar: p.productImage,
        category: p.category,
        tag: p.tag,
        stock: p.stock || 0,
        sizes: p.sizes || [],
      })),
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, title, description, category, avatar } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (productId) {
      const existProductId = await Product.findOne({
        productId,
        _id: { $ne: id },
      });

      if (existProductId) {
        return res.status(409).json({
          message: "Product Id already exists",
        });
      }

      product.productId = productId;
    }

    if (category) {
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        return res.status(400).json({ message: "Category not found" });
      }
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

      if (existSlug) {
        return res.status(409).json({
          message: "Product title already exists",
        });
      }

      product.title = title;
      product.slug = slug;
    }

    if (description !== undefined) product.description = description;
    if (avatar !== undefined) product.productImage = avatar;

    await product.save();

    return res.status(200).json({
      message: "Update product success",
    });
  } catch (error) {
    console.error("Update product error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Delete product success",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createSizeVariant = async (req, res) => {
  try {
    const { productId } = req.params;
    const { size } = req.body;

    if (!size) {
      return res.status(400).json({
        message: "Size is required",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const existSize = await ProductSizeVariant.findOne({
      productId: productId,
      size,
    });

    if (existSize) {
      return res.status(409).json({
        message: "Size already exists for this product",
      });
    }

    const sizeVariant = await ProductSizeVariant.create({
      productId: productId,
      size,
    });

    return res.status(201).json({
      message: "Create size variant success",
      data: sizeVariant,
    });
  } catch (error) {
    console.error("Create size variant error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSizeVariant = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // 2. Aggregate size + tổng stock
    const sizeVariants = await ProductSizeVariant.aggregate([
      {
        $match: {
          productId: product._id,
        },
      },
      {
        $lookup: {
          from: "productcolorvariants", // tên collection (plural, lowercase)
          localField: "_id",
          foreignField: "sizeId",
          as: "colors",
        },
      },
      {
        $addFields: {
          stock: {
            $sum: "$colors.stock",
          },
        },
      },
      {
        $project: {
          colors: 0, // ẩn mảng colors nếu không cần
        },
      },
      {
        $sort: { size: 1 },
      },
    ]);

    const data = sizeVariants.map((sizeVariant) => ({
      id: sizeVariant.id,
      size: sizeVariant.size,
      stock: sizeVariant.stock || 0,
    }));

    return res.status(200).json({
      message: "Get size variants success",
      data: data,
    });
  } catch (error) {
    console.error("Get size variants error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteSizeVariant = async (req, res) => {
  try {
    const { sizeId } = req.params;

    const sizeVariant = await ProductSizeVariant.findByIdAndDelete(sizeId);

    if (!sizeVariant) {
      return res.status(404).json({
        message: "Size not found",
      });
    }

    return res.status(200).json({
      message: "Delete size variant success",
    });
  } catch (error) {
    console.error("Delete size error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createColorVariant = async (req, res) => {
  try {
    const { sizeId } = req.params;
    const { price, color, stock, avatar } = req.body;

    if (!price || !color || !stock) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const product = await ProductSizeVariant.findById(sizeId);
    if (!product) {
      return res.status(404).json({
        message: "Size not found",
      });
    }

    const existColor = await ProductColorVariant.findOne({
      sizeId: sizeId,
      color,
    });

    if (existColor) {
      return res.status(409).json({
        message: "Color already exists for this size",
      });
    }

    const sizeVariant = await ProductColorVariant.create({
      sizeId,
      color,
      price,
      stock,
      variantImage: avatar,
    });

    return res.status(201).json({
      message: "Create color variant success",
    });
  } catch (error) {
    console.error("Create size variant error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getColorVariant = async (req, res) => {
  try {
    const { sizeId } = req.params;

    const product = await ProductSizeVariant.findById(sizeId);
    if (!product) {
      return res.status(404).json({
        message: "Size not found",
      });
    }

    const colorVariants = await ProductColorVariant.find({
      sizeId: sizeId,
    }).sort({ color: 1 });

    const data = colorVariants.map((colorVariant) => ({
      id: colorVariant.id,
      color: colorVariant.color,
      price: colorVariant.price,
      stock: colorVariant.stock,
      avatar: colorVariant.variantImage,
    }));

    return res.status(200).json({
      message: "Get color variants success",
      data: data,
    });
  } catch (error) {
    console.error("Get color variants error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateColorVariant = async (req, res) => {
  try {
    const { colorId } = req.params;
    const { price, stock, avatar } = req.body;

    const product = await ProductColorVariant.findById(colorId);
    if (!product) {
      return res.status(404).json({
        message: "Color not found",
      });
    }

    if (price !== undefined) product.price = price;
    if (avatar !== undefined) product.productImage = avatar;
    if (stock !== undefined) product.stock = stock;

    await product.save();

    return res.status(200).json({
      message: "Update color variant success",
    });
  } catch (error) {
    console.error("Update color variant error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteColorVariant = async (req, res) => {
  try {
    const { colorId } = req.params;

    const colorVariant = await ProductSizeVariant.findByIdAndDelete(colorId);

    if (!colorVariant) {
      return res.status(404).json({
        message: "Color not found",
      });
    }

    return res.status(200).json({
      message: "Delete color variant success",
    });
  } catch (error) {
    console.error("Delete color variant error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
