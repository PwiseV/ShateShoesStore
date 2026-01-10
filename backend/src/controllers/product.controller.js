import * as productService from "../services/product.service.js";

export const createProduct = async (req, res) => {
  try {
    const { code, title, description, category, tag } = req.body;

    if (!code || !title || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Avatar image is required" });
    }

    const newProduct = await productService.createProduct({
      code,
      title,
      description,
      categoryName: category,
      tag,
      fileBuffer: req.file.buffer,
    });

    return res.status(201).json({
      message: "Create product success",
      data: newProduct,
    });
  } catch (error) {
    if (error.message === "PRODUCT_CODE_EXISTS") {
      return res.status(409).json({ message: "Product Code already exists" });
    }
    if (error.message === "CATEGORY_NOT_FOUND") {
      return res.status(400).json({ message: "Category not found" });
    }
    if (error.message === "SLUG_EXISTS") {
      return res
        .status(409)
        .json({ message: "Product title results in a duplicate slug" });
    }

    console.error("Controller Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const { category, keyword } = req.query;

    const { products, total } = await productService.getProducts({
      page,
      limit,
      category,
      keyword,
    });

    return res.status(200).json({
      success: "Fetch products success",
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get products controller error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, title, description, category, tag } = req.body;

    const updatedProduct = await productService.updateProduct(
      id,
      {
        code,
        title,
        description,
        category,
        tag,
      },
      req.file
    );

    return res.status(200).json({
      message: "Update product success",
    });
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Product not found" });
    }
    if (error.message === "PRODUCT_ID_EXISTS") {
      return res.status(409).json({ message: "Product Id already exists" });
    }
    if (error.message === "CATEGORY_NOT_FOUND") {
      return res.status(400).json({ message: "Category not found" });
    }
    if (error.message === "SLUG_EXISTS") {
      return res
        .status(409)
        .json({ message: "Product title results in a duplicate slug" });
    }

    console.error("Controller Update Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await productService.deleteProduct(id);

    return res.status(200).json({
      message: "Delete product and related variants success",
    });
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Product not found" });
    }

    console.error("Delete product controller error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createProductVariant = async (req, res) => {
  try {
    const id = req.params.id;
    const { stock, price, color, size } = req.body;

    if (color === undefined || price === undefined || stock === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newVariant = await productService.createVariant({
      productId: id,
      stock: Number(stock),
      price: Number(price),
      color,
      size,
      fileBuffer: req.file.buffer,
    });

    return res.status(201).json({
      message: "Create product variant success",
    });
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Parent product not found" });
    }
    if (error.message === "SKU_EXISTS") {
      return res.status(409).json({ message: "SKU code already exists" });
    }
    if (error.message === "INVALID_INPUT") {
      return res
        .status(400)
        .json({ message: "Price or Stock must be a positive number" });
    }

    console.error("Variant Controller Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, color, price, stock } = req.body;

    const updatedVariant = await productService.updateVariant(
      id,
      {
        size,
        color,
        price,
        stock,
      },
      req.file
    );

    return res.status(200).json({
      message: "Update product success",
    });
  } catch (error) {
    if (error.message === "VARIANT_NOT_FOUND") {
      return res.status(404).json({ message: "Variant not found" });
    }
    if (error.message === "INVALID_INPUT") {
      return res
        .status(400)
        .json({ message: "Price and Stock must be positive numbers" });
    }
    if (error.message === "MISSING_UPDATE_FIELDS") {
      return res.status(409).json({ message: "Missing update fields" });
    }

    console.error("Controller Update Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, color } = req.body;

    if (!size || !color) {
      return res.status(400).json({
        message:
          "Missing identifiers: size and color are required.",
      });
    }

    await productService.deleteProductVariant({ productId: id, size, color });

    return res.status(200).json({
      message: "Delete product variant and its image success",
    });
  } catch (error) {
    if (error.message === "VARIANT_NOT_FOUND") {
      return res.status(404).json({ message: "Product variant not found" });
    }

    console.error("Delete Variant Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
