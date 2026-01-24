import * as productService from "../services/product.service.js";
import { handleServiceError } from "../utils/errorHandler.js";
import { getErrorMessage } from "../constants/errorMessages.js";

export const createProduct = async (req, res) => {
  try {
    const { code, title, description, category, tags } = req.body;
    if (!code || !title || !category) {
      return res.status(400).json({ message: getErrorMessage("MISSING_REQUIRED_FIELDS") });
    }
    if (!req.file) {
      return res.status(400).json({ message: getErrorMessage("THUMBNAIL_REQUIRED") });
    }
    let processedTags = [];
    if (tags) {
      processedTags = Array.isArray(tags) ? tags : [tags];
    }

    const newProduct = await productService.createProduct({
      code,
      title,
      description,
      categoryName: category,
      tag: processedTags,
      fileBuffer: req.file.buffer,
    });

    return res.status(201).json({
      message: "Tạo sản phẩm thành công",
      data: newProduct,
    });
  } catch (error) {
    return handleServiceError(error, res);
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
      success: true,
      message: "Lấy danh sách sản phẩm thành công",
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const product = await productService.getOneProduct({ id, userId });

    return res.status(200).json({
      success: true,
      message: "Lấy sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, title, description, category, tags } = req.body;
    let processedTags = [];
    if (tags) {
      processedTags = Array.isArray(tags) ? tags : [tags];
    }
    await productService.updateProduct(
      id,
      {
        code,
        title,
        description,
        category,
        tag: processedTags,
      },
      req.file
    );

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await productService.deleteProduct(id);

    return res.status(200).json({
      message: "Xóa sản phẩm và các biến thể liên quan thành công",
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const createProductVariant = async (req, res) => {
  try {
    const id = req.params.id;
    const { stock, price, color, size } = req.body;

    if (color === undefined || price === undefined || stock === undefined) {
      return res.status(400).json({ message: getErrorMessage("MISSING_REQUIRED_FIELDS") });
    }

    await productService.createVariant({
      productId: id,
      stock: Number(stock),
      price: Number(price),
      color,
      size,
      fileBuffer: req.file,
    });

    return res.status(201).json({
      message: "Tạo biến thể sản phẩm thành công",
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const updateProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, color, price, stock } = req.body;

    await productService.updateVariant(
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
      message: "Cập nhật biến thể sản phẩm thành công",
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};

export const deleteProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, color } = req.body;

    if (!size || !color) {
      return res.status(400).json({
        message: getErrorMessage("MISSING_REQUIRED_FIELDS"),
      });
    }

    await productService.deleteProductVariant({ productId: id, size, color });

    return res.status(200).json({
      message: "Xóa biến thể sản phẩm và ảnh thành công",
    });
  } catch (error) {
    return handleServiceError(error, res);
  }
};
