import * as blogService from "../services/blog.service.js";

/**
 * GET /blog/trending-products
 */
export const getTrendingProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 6;
    const data = await blogService.getTrendingProducts(limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /blog/posts
 */
export const getLatestPosts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 4;
    const data = await blogService.getLatestPosts(limit);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /blog/newsletter/subscribe
 */
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    await blogService.subscribeNewsletter(email);
    res.json({ message: "Đăng ký nhận tin thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * GET /api/blog/posts/:id
 */
export const getBlogPostDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await blogService.getBlogPostDetailById(id);
    res.json(data);
  } catch (error) {
    if (error.message === "POST_NOT_FOUND") {
      return res.status(404).json({ message: "POST_NOT_FOUND" });
    }
    res.status(500).json({ message: "SERVER_ERROR" });
  }
};

