import React from "react";
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import BlogHero from "./components/BlogHero";
import BlogContent from "./components/BlogContent";

const BlogPost = () => {
  // Giả lập data từ API
  const postData = {
    title: "Titile Blog",
    author: "Tracy Nguyễn",
    date: "02 tháng 12, năm 2025",
    image: "url_anh_giay_sneaker.jpg",
    content: "Nội dung bài viết ở đây ...",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Phần 1: Banner & Tiêu đề */}
        <BlogHero
          title={postData.title}
          author={postData.author}
          date={postData.date}
          image={postData.image}
        />

        {/* Phần 2: Nội dung chi tiết */}
        <BlogContent content={postData.content} />
      </main>

      <Footer />
    </div>
  );
};
export default BlogPost;
