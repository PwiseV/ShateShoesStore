import { type BlogPostDetail } from "./blogPostServices";

/* ============================
   MOCK DATA
============================ */

const mockPostDetails: Record<string, BlogPostDetail> = {
  "101": {
    id: 101,
    title: "Chuyện những đôi giày kể",
    author: "Tracy Nguyễn",
    published_at: "Sun September 10th 2025",
    image:
      "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=1200&q=80",
    content: `
      <h3>Hành trình của những bước chân</h3>
      <p>Mỗi đôi giày không chỉ là phụ kiện, mà là người bạn đồng hành trên mọi nẻo đường. Từ những đôi sneaker năng động cho đến những đôi giày tây lịch lãm, tất cả đều mang trong mình một câu chuyện riêng.</p>
      
      <h3>Tại sao nên chọn giày tốt?</h3>
      <ul>
        <li>Bảo vệ sức khỏe đôi chân.</li>
        <li>Tăng sự tự tin khi giao tiếp.</li>
        <li>Thể hiện phong cách cá nhân.</li>
      </ul>
      
      <p>Hãy để <strong>ShateShoes</strong> giúp bạn viết tiếp câu chuyện của mình bằng những bước đi vững chắc nhất.</p>
    `,
  },
  "102": {
    id: 102,
    title: "Mẹo hay cho tín đồ giày đẹp",
    author: "Minh Tuấn",
    published_at: "Sun September 10th 2025",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200&q=80",
    content: `
      <h3>Cách bảo quản giày sneaker trắng</h3>
      <p>Giày trắng rất đẹp nhưng cũng rất dễ bẩn. Để giữ giày luôn mới, bạn nên:</p>
      <ul>
        <li>Dùng chai xịt nano chống thấm nước.</li>
        <li>Vệ sinh ngay khi có vết bẩn nhỏ.</li>
        <li>Không phơi giày trực tiếp dưới ánh nắng gắt.</li>
      </ul>
    `,
  },
};

/* ============================
   BLOG POST APIS (MOCK)
============================ */

// Get Blog Post Detail by ID
export const getBlogPostById = async (id: string): Promise<BlogPostDetail> => {
  await new Promise((res) => setTimeout(res, 800)); // Giả lập delay 0.8s

  const post = mockPostDetails[id];

  if (!post) {
    // Trả về data mặc định nếu không tìm thấy ID (để tránh lỗi crash khi test)
    return {
      id: "not-found",
      title: "Không tìm thấy bài viết",
      author: "Admin",
      published_at: "N/A",
      image: "https://via.placeholder.com/1200x600?text=Not+Found",
      content:
        "<p>Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>",
    };
  }

  return post;
};
