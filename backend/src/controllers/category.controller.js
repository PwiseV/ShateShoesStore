import slugify from "slugify";
import Category from "../models/Category.js"

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if ( !name ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existCategory = await Category.findOne({ name });
    if (existCategory) {
      return res.status(409).json({
        message: "Category already exists",
      });
    }

    const slug = slugify(name, {
      lower: true,
      strict: true,
      locale: "vi",
      trim: true,
    });

    const existSlug = await Category.findOne({ slug });
    if (existSlug) {
      return res.status(409).json({
        message: "Category slug already exists",
      });
    }

    await Category.create({
      name,
      slug,
    });
    return res.status(201).json({
      message: "Create category success",
    });
  } catch (error) {
    console.error("Create category error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
