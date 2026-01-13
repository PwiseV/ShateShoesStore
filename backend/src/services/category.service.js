import slugify from "slugify";
import Category from "../models/Category.js";

export const createCategory = async ({ name, parentId }) => {
    const existCategory = await Category.findOne({ name });
    if (existCategory) {
        throw new Error("CATEGORY_EXISTS");
    }

    const slug = slugify(name, {
        lower: true,
        strict: true,
        locale: "vi",
        trim: true,
    });

    const existSlug = await Category.findOne({ slug });
    if (existSlug) {
        throw new Error("SLUG_EXISTS");
    }

    if (parentId) {
        const parentCategory = await Category.findById(parentId);
        if (!parentCategory) {
            throw new Error("PARENT_NOT_FOUND");
        }
    }

    return await Category.create({
        name,
        slug,
        parentId: parentId || null,
    });
};


export const getAllCategories = async () => {
    return await Category.find({ parentId: { $ne: null } }).sort({ createdAt: -1 });
}

export const getAllCategoryList = async () => {
  const allCategories = await Category.find().sort({ createdAt: -1 }).lean();
  const parentCategories = allCategories.filter(cat => !cat.parentId);

  const structuredCategories = parentCategories.map(parent => {
    const children = allCategories
      .filter(cat => cat.parentId && cat.parentId.toString() === parent._id.toString())
      .map(child => ({
        id: child._id,
        name: child.name,
      }));

    return {
      id: parent._id,
      name: parent.name,
      category: children,
    };
  });

  return structuredCategories;
};