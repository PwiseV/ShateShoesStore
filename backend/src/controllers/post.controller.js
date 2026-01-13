import * as postService from "../services/post.service.js";

export const getPosts = async (req, res) => {
  try {
    const result = await postService.getAllPosts(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Không thể lấy danh sách bài viết" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    const status = error.message === "POST_NOT_FOUND" ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body, req.file?.buffer);
    res.status(201).json({ message: "Create post success", data: post });
  } catch (error) {
    const status = error.message === "SLUG_ALREADY_EXISTS" ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body, req.file?.buffer);
    res.status(200).json({ message: "Update post success", data: post });
  } catch (error) {
    const status = error.message === "POST_NOT_FOUND" ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.id);
    res.status(200).json({ message: "Delete post success" });
  } catch (error) {
    const status = error.message === "POST_NOT_FOUND" ? 404 : 500;
    res.status(status).json({ message: error.message });
  }
};

// api/posts/:id/status [PATCH] used in admin panel to change post status
export const updatePostStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await postService.updatePost(id, { status });
    res.status(200).json({ message: "Update status success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};