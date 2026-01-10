import * as categoryService from "../services/category.service.js";

export const createCategory = async (req, res) => {
  console.log("Dữ liệu nhận được:", req.body);
  try {
    const { name, parentId } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const category = await categoryService.createCategory({ name, parentId });
    return res.status(201).json({
      message: "Create category success",
      data: category,
    });
  } catch (error) {
    if (
      error.message === "CATEGORY_EXISTS" ||
      error.message === "SLUG_EXISTS"
    ) {
      return res
        .status(409)
        .json({ message: "Category or Slug already exists" });
    }

    if (error.message === "PARENT_NOT_FOUND") {
      return res.status(404).json({ message: "Parent category not found" });
    }
    console.error("Create category error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
