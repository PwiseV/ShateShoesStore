import type { Post } from "./types";

export const getAvailableMonths = (posts: Post[]): string[] => {
  const uniqueMonths = new Set<string>();

  // 1. Luôn thêm tháng hiện tại
  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;
  uniqueMonths.add(currentMonthStr);

  // 2. Quét qua bài viết để lấy tháng cũ
  posts.forEach((post) => {
    if (post.createdAt) {
      const monthStr = post.createdAt.substring(0, 7);
      uniqueMonths.add(monthStr);
    }
  });

  // 3. Sắp xếp giảm dần
  return Array.from(uniqueMonths).sort().reverse();
};
