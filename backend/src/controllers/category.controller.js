import slugify from "slugify";
import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, parentId } = req.body;

    // 1. Validate
    if (!name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 2. Check trùng name
    const existCategory = await Category.findOne({ name });
    if (existCategory) {
      return res.status(409).json({
        message: "Category already exists",
      });
    }

    // 3. Tạo slug
    const slug = slugify(name, {
      lower: true,
      strict: true,
      locale: "vi",
      trim: true,
    });

    // 4. Check trùng slug
    const existSlug = await Category.findOne({ slug });
    if (existSlug) {
      return res.status(409).json({
        message: "Category slug already exists",
      });
    }

    // 5. Nếu có parentId → kiểm tra tồn tại
    let parentCategory = null;
    if (parentId) {
      parentCategory = await Category.findById(parentId);
      if (!parentCategory) {
        return res.status(404).json({
          message: "Parent category not found",
        });
      }
    }

    // 6. Create category
    const category = await Category.create({
      name,
      slug,
      parentId: parentId || null,
    });

    return res.status(201).json({
      message: "Create category success",
      data: category,
    });
  } catch (error) {
    console.error("Create category error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
