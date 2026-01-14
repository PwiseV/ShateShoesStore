import { useState, useEffect, useMemo } from "react";
import {
  getPosts,
  deletePost,
  createPost,
  updatePost,
  updatePostStatus,
} from "../../../../services/adminPostServices";
import type { Post, PostFormData } from "../types";
import { useToast } from "../../../../context/useToast";
import { getAvailableMonths } from "../utils";

export const usePosts = () => {
  // --- DATA STATE ---
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useToast();

  // --- FILTER STATE ---
  const [keyword, setKeyword] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const pageSize = 10;

  // --- FETCH DATA ---
  const fetchPosts = async (page = currentPage) => {
    setLoading(true);
    try {
      const res = await getPosts({
        page,
        pageSize,
        keyword,
        category: filterCategory === "All" ? undefined : filterCategory,
        status: filterStatus === "All" ? undefined : filterStatus,
      });

      setPosts(res.data);
      setTotalPages(Math.ceil(res.total / pageSize));
    } catch (err) {
      console.error(err);
      showToast("Lỗi tải danh sách bài viết", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE ---
  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    setLoading(true);
    try {
      await deletePost(id);
      showToast("Xóa bài viết thành công", "success");
      await fetchPosts(currentPage);
    } catch (err) {
      showToast("Lỗi khi xóa bài viết", "error");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => fetchPosts(currentPage);

  // --- AUTO FETCH ---
  useEffect(() => {
    fetchPosts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filterCategory, filterStatus]);

  // =========================================================
  // PHẦN LOGIC FORM & MODAL
  // =========================================================

  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    slug: "",
    category: "",
    thumbnail: "",
    content: "",
    author: "",
    status: "active",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Derived State
  const availableMonths = useMemo(() => getAvailableMonths(posts), [posts]);

  // Handlers Modal
  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      category: "",
      thumbnail: "",
      content: "",
      author: "",
      status: "active",
    });
    setSelectedFile(null);
    setOpenModal(true);
  };

  const handleOpenEdit = (post: Post) => {
    setIsEditMode(true);
    setEditingId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      thumbnail: post.thumbnail,
      content: post.content,
      author: post.author,
      status: post.status,
    });
    setSelectedFile(null);
    setOpenModal(true);
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file.name }));
    }
  };

  const handleToggleStatus = async (post: Post) => {
    const newStatus = post.status === "active" ? "hidden" : "active";
    try {
      await updatePostStatus(post.id, newStatus);
      showToast(`Đã chuyển trạng thái sang ${newStatus}`, "success");
      refreshData();
    } catch (error) {
      showToast("Lỗi cập nhật trạng thái", "error");
    }
  };

  // --- SUBMIT HANDLE (UPDATED FOR E11000 ERROR) ---
  const handleSubmitModal = async () => {
    if (!formData.title || !formData.content) {
      showToast("Vui lòng nhập tiêu đề và nội dung", "error");
      return;
    }

    try {
      if (isEditMode && editingId) {
        await updatePost(editingId, formData, selectedFile);
        showToast("Cập nhật bài viết thành công", "success");
      } else {
        if (!selectedFile) {
          showToast("Vui lòng chọn ảnh thumbnail", "error");
          return;
        }
        await createPost(formData, selectedFile);
        showToast("Tạo bài viết thành công", "success");
      }
      setOpenModal(false);
      refreshData();
    } catch (error: any) {
      console.error("Submit error:", error);

      // Lấy message từ backend (có thể là object hoặc string)
      const serverMessage = error?.response?.data?.message || "";
      const serverErrorString = JSON.stringify(error?.response?.data || "");

      // Kiểm tra các trường hợp trùng tiêu đề:
      // 1. Backend trả về flag "SLUG_ALREADY_EXISTS"
      // 2. Backend trả về lỗi raw MongoDB "E11000 duplicate key"
      if (
        serverMessage === "SLUG_ALREADY_EXISTS" ||
        serverMessage.includes("E11000") ||
        serverMessage.includes("duplicate key") ||
        serverErrorString.includes("E11000")
      ) {
        showToast("Tiêu đề bị trùng", "error");
      } else if (serverMessage) {
        // Các lỗi khác
        showToast(serverMessage, "error");
      } else {
        // Fallback
        showToast("Có lỗi xảy ra, vui lòng thử lại", "error");
      }
    }
  };

  // Reset Filters UI
  const handleResetFilter = () => {
    setKeyword("");
    setFilterCategory("All");
    setFilterMonth("All");
    setCurrentPage(1);
    getPosts({ page: 1, pageSize }).then((res) => {
      setPosts(res.data);
      setTotalPages(Math.ceil(res.total / pageSize));
    });
    showToast("Đã đặt lại bộ lọc", "success");
  };

  const handleFilter = () => {
    setCurrentPage(1);
    fetchPosts(1);
  };

  return {
    posts,
    loading,
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
    handleDelete,
    refreshData,
    fetchPosts,
    handleFilter,
    handleResetFilter,
    handleToggleStatus,
    openModal,
    setOpenModal,
    isEditMode,
    formData,
    setFormData,
    handleOpenAdd,
    handleOpenEdit,
    handleFileChange,
    handleSubmitModal,
  };
};
