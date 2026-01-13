import Post from "../models/Post.js";
import slugify from "slugify";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "./cloudinaryService.js";

// get list of posts with pagination, search, and filters
export const getAllPosts = async (params) => {
  const { page = 1, pageSize = 10, keyword, category, month, status } = params;
  let query = {};

  if (keyword) query.title = { $regex: keyword, $options: "i" };
  if (category && category !== "All" && category !== "Tất cả chủ đề") query.category = category;
  if (status) query.status = status;

  if (month && month !== "All") {
    const [year, m] = month.split("-");
    const startDate = new Date(year, m - 1, 1);
    const endDate = new Date(year, m, 1);
    query.createdAt = { $gte: startDate, $lt: endDate };
  }

  const total = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(pageSize))
    .limit(Number(pageSize));

  return {
    data: posts.map(p => ({
      ...p.toJSON(),
      thumbnail: p.thumbnail.url // only URL so fe can use directly
    })),
    total,
    page: Number(page),
    pageSize: Number(pageSize)
  };
};

// get single post by ID
export const getPostById = async (id) => {
  const post = await Post.findById(id);
  if (!post) throw new Error("POST_NOT_FOUND");
  return { ...post.toJSON(), thumbnail: post.thumbnail.url };
};

// create new post
export const createPost = async (payload, fileBuffer) => {
  const { title, slug } = payload;
  const finalSlug = slug || slugify(title, { lower: true, strict: true, locale: 'vi' });

  // check slug uniqueness
  const exist = await Post.findOne({ slug: finalSlug });
  if (exist) throw new Error("SLUG_ALREADY_EXISTS");

  if (!fileBuffer) throw new Error("THUMBNAIL_REQUIRED");

  // Upload Cloudinary
  const uploadRes = await uploadImageToCloudinary(fileBuffer, "posts");

  return await Post.create({
    ...payload,
    slug: finalSlug,
    thumbnail: { url: uploadRes.url, publicId: uploadRes.publicId },
    status: payload.status || "active"
  });
};

// update post
export const updatePost = async (id, payload, fileBuffer) => {
  const post = await Post.findById(id);
  if (!post) throw new Error("POST_NOT_FOUND");

  let updateData = { ...payload };

  // update slug if title changed
  if (payload.title) {
    updateData.slug = slugify(payload.title, { lower: true, strict: true, locale: 'vi' });
  }

  // change thumbnail if new file provided
  if (fileBuffer) {
    // delete old image from Cloudinary
    try {
      if (post.thumbnail?.publicId) await deleteImageFromCloudinary(post.thumbnail.publicId);
    } catch (e) { console.error("Lỗi xóa Cloudinary:", e.message); }

    // upload new image
    const uploadRes = await uploadImageToCloudinary(fileBuffer, "posts");
    updateData.thumbnail = { url: uploadRes.url, publicId: uploadRes.publicId };
  }

  return await Post.findByIdAndUpdate(id, updateData, { new: true });
};

// delete post
export const deletePost = async (id) => {
  const post = await Post.findById(id);
  if (!post) throw new Error("POST_NOT_FOUND");

  try {
    if (post.thumbnail?.publicId) await deleteImageFromCloudinary(post.thumbnail.publicId);
  } catch (e) { console.error("Lỗi xóa Cloudinary:", e.message); }

  return await Post.findByIdAndDelete(id);
};