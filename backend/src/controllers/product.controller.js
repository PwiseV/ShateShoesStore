import * as productService from "../services/product.service.js";

export const createProduct = async (req, res) => {
  try {
    const { code, title, description, category, tags } = req.body;
    if (!code || !title || !category) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Ảnh đại diện là bắt buộc" });
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
    if (error.message === "PRODUCT_CODE_EXISTS") {
      return res.status(409).json({ message: "Mã sản phẩm đã tồn tại" });
    }
    if (error.message === "CATEGORY_NOT_FOUND") {
      return res.status(400).json({ message: "Danh mục không tìm thấy" });
    }
    if (error.message === "SLUG_EXISTS") {
      return res
        .status(409)
        .json({ message: "Tên sản phẩm bị trùng slug" });
    }

    console.error("Controller Error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
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
      success: "Lấy danh sách sản phẩm thành công",
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
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const product = await productService.getOneProduct({ id, userId });

    return res.status(200).json({
      success: "Lấy sản phẩm thành công",
      data: product,
    });
  } catch (error) {
    console.error("Get products controller error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
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
    const updatedProduct = await productService.updateProduct(
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
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
    }
    if (error.message === "PRODUCT_ID_EXISTS") {
      return res.status(409).json({ message: "ID sản phẩm đã tồn tại" });
    }
    if (error.message === "CATEGORY_NOT_FOUND") {
      return res.status(400).json({ message: "Danh mục không tìm thấy" });
    }
    if (error.message === "SLUG_EXISTS") {
      return res
        .status(409)
        .json({ message: "Tên sản phẩm bị trùng slug" });
    }

    console.error("Controller Update Error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
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
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
    }

    console.error("Delete product controller error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const createProductVariant = async (req, res) => {
  try {
    const id = req.params.id;
    const { stock, price, color, size } = req.body;

    if (color === undefined || price === undefined || stock === undefined) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const newVariant = await productService.createVariant({
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
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Sản phẩm cha không tồn tại" });
    }
    if (error.message === "SKU_EXISTS") {
      return res.status(409).json({ message: "Mã SKU đã tồn tại" });
    }
    if (error.message === "INVALID_INPUT") {
      return res
        .status(400)
        .json({ message: "Giá hoặc Trữ lượng phải là số dương" });
    }
    if (error.message === "VARIANT_ALREADY_EXISTS") {
      return res
        .status(409)
        .json({ message: "Biến thể đã tồn tại" });
    }
    if (error.message === "IMAGE_REQUIRED_FOR_NEW_COLOR") {
      return res.status(400).json({ message: "Ảnh là bắt buộc cho màu mới" });
    }

    console.error("Variant Controller Error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
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
      message: "Cập nhật biến thể sản phẩm thành công",
    });
  } catch (error) {
    if (error.message === "VARIANT_NOT_FOUND") {
      return res.status(404).json({ message: "Biến thể không tồn tại" });
    }
    if (error.message === "INVALID_INPUT") {
      return res
        .status(400)
        .json({ message: "Giá và trữ lượng phải là số dương" });
    }
    if (error.message === "MISSING_UPDATE_FIELDS") {
      return res.status(409).json({ message: "Thiếu trường cập nhật" });
    }

    console.error("Controller Update Error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, color } = req.body;

    if (!size || !color) {
      return res.status(400).json({
        message:
          "Thiếu định danh: size và color là bắt buộc.",
      });
    }

    await productService.deleteProductVariant({ productId: id, size, color });

    return res.status(200).json({
      message: "Xóa biến thể sản phẩm và ảnh thành công",
    });
  } catch (error) {
    if (error.message === "VARIANT_NOT_FOUND") {
      return res.status(404).json({ message: "Biến thể không tìm thấy" });
    }

    console.error("Delete Variant Error:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
