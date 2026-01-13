import { useState, useEffect, useMemo } from "react";
import {
  getPosts,
  deletePost,
  createPost,
  updatePost,
  updatePostStatus,
} from "../../../../services/adminPostServices"; // Sửa đường dẫn import service của bạn cho đúng
import type { Post, PostFormData } from "../types";
import { PAGE_SIZE } from "../constants";
import { getAvailableMonths } from "../utils";
import { useToast } from "./useToast";

export const usePosts = () => {
  const { showToast } = useToast();

  // State Data
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // State Filters
  const [keyword, setKeyword] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");

  // State Modal
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    category: "Phối đồ",
    thumbnail: "",
    content: "",
    author: "",
    status: "active",
  });

  // Derived State
  const availableMonths = useMemo(() => getAvailableMonths(posts), [posts]);

  // --- API ---
  const fetchPosts = async (page = currentPage, customParams?: any) => {
    setLoading(true);
    try {
      const params = customParams || {
        page,
        pageSize: PAGE_SIZE,
        keyword,
        category: filterCategory,
        month: filterMonth,
      };

      const res = await getPosts(params);
      setPosts(res.data);
      setTotalPages(Math.ceil(res.total / PAGE_SIZE));
    } catch (error) {
      console.error(error);
      showToast("Lỗi tải bài viết", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // --- HANDLERS FILTER ---
  const handleFilter = () => {
    setCurrentPage(1);
    fetchPosts(1);
  };

  const handleResetFilter = () => {
    setKeyword("");
    setFilterCategory("All");
    setFilterMonth("All");
    setCurrentPage(1);
    fetchPosts(1, {
      page: 1,
      pageSize: PAGE_SIZE,
      keyword: "",
      category: "All",
      month: "All",
    });
    showToast("Đã đặt lại bộ lọc", "success");
  };

  // --- HANDLERS ACTIONS ---
  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return;
    try {
      await deletePost(id);
      showToast("Đã xóa bài viết", "success");
      fetchPosts(currentPage);
    } catch (e) {
      showToast("Lỗi khi xóa", "error");
    }
  };

  const handleToggleStatus = async (post: Post) => {
    const newStatus = post.status === "active" ? "hidden" : "active";
    try {
      await updatePostStatus(post.id, newStatus);
      fetchPosts(currentPage);
      showToast(
        `Đã chuyển sang ${newStatus === "active" ? "hiển thị" : "ẩn"}`,
        "success"
      );
    } catch (error) {
      showToast("Lỗi cập nhật trạng thái", "error");
    }
  };

  // --- HANDLERS MODAL ---
  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      title: "",
      category: "Phối đồ",
      thumbnail: "",
      content: "",
      author: "",
      status: "active",
    });
    setOpenModal(true);
  };

  const handleOpenEdit = (post: Post) => {
    setIsEditMode(true);
    setEditingId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      thumbnail: post.thumbnail || "",
      content: post.content,
      author: post.author,
      status: post.status,
    });
    setOpenModal(true);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleSubmitModal = async () => {
    if (!formData.title || !formData.content || !formData.author) {
      showToast("Vui lòng nhập đủ: Tiêu đề, Tác giả và Nội dung", "error");
      return;
    }

    try {
      if (isEditMode && editingId) {
        await updatePost(editingId, formData, selectedFile);
        showToast("Cập nhật thành công", "success");
      } else {
        if (!selectedFile) return showToast("Chọn ảnh thumbnail!", "error");
        await createPost(formData, selectedFile);
        showToast("Tạo bài viết thành công", "success");
      }
      setOpenModal(false);
      fetchPosts(currentPage);
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  return {
    // State
    loading,
    posts,
    currentPage,
    totalPages,
    setCurrentPage,
    keyword,
    setKeyword,
    filterCategory,
    setFilterCategory,
    filterMonth,
    setFilterMonth,
    availableMonths,
    openModal,
    setOpenModal,
    isEditMode,
    formData,
    setFormData,
    // Handlers
    handleFilter,
    handleResetFilter,
    handleDelete,
    handleToggleStatus,
    handleOpenAdd,
    handleOpenEdit,
    handleFileChange,
    handleSubmitModal,
  };
};
