import Product from "../models/Product.js";
import Post from "../models/Post.js";

/**
 * Trending products
 * FE cần:
 * { id, name, image, price? }
 */
export const getTrendingProducts = async (limit) => {
  const products = await Product.find()
    .sort({ createdAt: -1 }) // giả lập bán chạy
    .limit(limit)
    .lean();

  return products.map((p) => ({
    id: p._id,
    name: p.title,
    image: p.avatar?.url || "",
    price: 0, // FE không dùng vẫn ok
  }));
};

export const getLatestPosts = async (limit) => {
  const posts = await Post.find({ status: "active" })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return posts.map((p) => ({
    id: p._id,
    title: p.title,
    summary: p.content.slice(0, 120) + "...",
    excerpt: p.content.slice(0, 120) + "...",
    thumbnail: p.thumbnail?.url || "",
    published_at: p.createdAt,
    createdAt: p.createdAt,
  }));
};

export const subscribeNewsletter = async (email) => {
  if (!email) {
    throw new Error("Email không hợp lệ");
  }
  return true;
};

/**
 * BLOG - get post detail by id (PUBLIC)
 */
export const getBlogPostDetailById = async (id) => {
  const post = await Post.findOne({
    _id: id,
    status: "active",
  });

  if (!post) {
    throw new Error("POST_NOT_FOUND");
  }

  return {
    id: post.id,
    title: post.title,
    author: post.author,
    published_at: post.createdAt,
    image: post.thumbnail?.url,
    content: post.content,
  };
};

/**
 * BLOG LIST (PUBLIC)
 * - status = active
 * - pagination
 * - search by title
 */
export const getBlogList = async ({ page, limit, search }) => {
  const filter = {
    status: "active",
  };

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Post.countDocuments(filter),
  ]);

  return {
    data: posts.map((p) => ({
      id: p._id,
      title: p.title,
      slug: p.slug,
      thumbnail: p.thumbnail?.url || "",
      category: p.category,
      createdAt: p.createdAt,
      excerpt: p.content.slice(0, 120) + "...",
    })),
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};
