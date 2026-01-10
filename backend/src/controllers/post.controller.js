import Post from "../models/Post.js";
import slugify from "slugify";
import { uploadImageToCloudinary, deleteImageFromCloudinary } from "../services/cloudinaryService.js";

// get list of posts with pagination, search, and filters
export const getPosts = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, keyword, category, month, status } = req.query;

    let query = {};

    // search by title keyword
    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    // filter by category
    if (category && category !== "All" && category !== "Tất cả chủ đề") {
      query.category = category;
    }

    // filter by status
    if (status) {
      query.status = status;
    }

    // filter by month (format "2025-10" from FE)
    if (month && month !== "All") {
      const [year, m] = month.split("-");
      const startDate = new Date(year, m - 1, 1);
      const endDate = new Date(year, m, 1);
      query.createdAt = { $gte: startDate, $lt: endDate };
    }

    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .sort({ createdAt: -1 }) // newest first
      .skip((Number(page) - 1) * Number(pageSize))
      .limit(Number(pageSize));

    // map posts to include only thumbnail URL
    const data = posts.map(post => ({
      ...post.toJSON(),
      thumbnail: post.thumbnail.url, // return only the URL
    }));

    res.status(200).json({
      data,
      total,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server khi lấy danh sách" });
  }
};

// get single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });
    
    res.status(200).json({
      ...post.toJSON(),
      thumbnail: post.thumbnail.url // return only the URL
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi Server" });
  }
};

// create a new post
export const createPost = async (req, res) => {
  try {
    const { title, category, author, content, slug } = req.body;

    // validate unique slug
    const finalSlug = slug || slugify(title, { lower: true, strict: true, locale: 'vi' });
    
    // check if slug already exists
    const exist = await Post.findOne({ slug: finalSlug });
    if (exist) return res.status(400).json({ message: "Tiêu đề bài viết đã tồn tại" });

    if (!req.file) return res.status(400).json({ message: "Vui lòng upload ảnh thumbnail" });

    // Upload to Cloudinary
    const uploadRes = await uploadImageToCloudinary(req.file.buffer, "posts");

    const newPost = await Post.create({
      title,
      category,
      author,
      content,
      status: "active",
      slug: finalSlug,
      thumbnail: {
        url: uploadRes.url,
        publicId: uploadRes.publicId,
      },
    });

    res.status(201).json({ message: "Create post success", data: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update an existing post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });

    let updateData = { ...req.body };

    // update slug if title is changed
    if (updateData.title) {
      updateData.slug = slugify(updateData.title, { lower: true, strict: true, locale: 'vi' });
    }

    // update thumbnail if a new file is uploaded
    if (req.file) {
      // delete old image from Cloudinary
      await deleteImageFromCloudinary(post.thumbnail.publicId);
      // upload new image
      const uploadRes = await uploadImageToCloudinary(req.file.buffer, "posts");
      updateData.thumbnail = {
        url: uploadRes.url,
        publicId: uploadRes.publicId,
      };
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "Update post success", data: updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update post status (active/hidden)
export const updatePostStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Post.findByIdAndUpdate(id, { status });
    res.status(200).json({ message: "Update status success" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật trạng thái" });
  }
};

// delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Không tìm thấy" });

    // delete image from Cloudinary
    await deleteImageFromCloudinary(post.thumbnail.publicId);
    // delete post from database
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Delete post success" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa bài viết" });
  }
};