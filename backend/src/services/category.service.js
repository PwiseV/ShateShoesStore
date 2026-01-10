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