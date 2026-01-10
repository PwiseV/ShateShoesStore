// pages/Admin/Posts/Posts.tsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  CircularProgress,
  Stack,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";

// Icons
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UploadFileIcon from "@mui/icons-material/UploadFile";

// Layout
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";

// Services (Chọn 1 trong 2 để import)
// import {
//   getPosts,
//   deletePost,
//   createPost,
//   updatePost,
//   updatePostStatus,
//   type Post,
// } from "../../../services/adminPostServices"; // <-- Real API

import {
  getPosts,
  deletePost,
  createPost,
  updatePost,
  updatePostStatus,
  type Post,
} from "../../../services/fakeAdminPostServices"; // <-- Fake API

// Context Mock
const useToast = () => {
  return {
    showToast: (msg: string, type: "success" | "error") => {
      console.log(`[${type.toUpperCase()}] ${msg}`);
    },
  };
};

const Posts: React.FC = () => {
  const TABLE_GRID = "50px 2fr 120px 2fr 120px 100px 80px";
  const { showToast } = useToast();

  useEffect(() => {
    document.title = "SHATE - Quản lý bài viết";
    window.scrollTo(0, 0);
  }, []);

  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // Filters
  const [keyword, setKeyword] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMonth, setFilterMonth] = useState("All");

  // Modal State
  const [openModal, setOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form Data
  const [formData, setFormData] = useState({
    title: "",
    category: "Phối đồ",
    thumbnail: "",
    content: "",
    author: "",
    status: "active" as "active" | "hidden",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- LOGIC MỚI: Tự động lấy danh sách tháng ---
  const availableMonths = useMemo(() => {
    const uniqueMonths = new Set<string>();

    // 1. Luôn thêm tháng hiện tại vào danh sách (để khi vừa tạo bài xong là có options lọc ngay)
    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;
    uniqueMonths.add(currentMonthStr);

    // 2. Quét qua các bài viết đang có để lấy thêm các tháng cũ
    posts.forEach((post) => {
      if (post.createdAt) {
        // post.createdAt dạng "2025-10-15" => lấy 7 ký tự đầu "2025-10"
        const monthStr = post.createdAt.substring(0, 7);
        uniqueMonths.add(monthStr);
      }
    });

    // 3. Chuyển về mảng và sắp xếp giảm dần (tháng mới nhất lên đầu)
    return Array.from(uniqueMonths).sort().reverse();
  }, [posts]);
  // ------------------------------------------------

  // --- API ---
  const fetchPosts = async (page = currentPage, customParams?: any) => {
    setLoading(true);
    try {
      const params = customParams || {
        page,
        pageSize,
        keyword,
        category: filterCategory,
        month: filterMonth,
      };

      const res = await getPosts(params);
      setPosts(res.data);
      // Giả sử API trả về total record để tính trang
      // Nếu fake service trả về total item thì công thức này đúng
      setTotalPages(Math.ceil(res.total / pageSize));
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
      pageSize,
      keyword: "",
      category: "All",
      month: "All",
    });
    showToast("Đã đặt lại bộ lọc", "success");
  };

  // --- ACTIONS ---
  const handleDelete = async (id: number) => {
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

  // --- MODAL HANDLERS ---
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Mock: Lấy tên file
      setFormData({ ...formData, thumbnail: e.target.files[0].name });
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content || !formData.author) {
      showToast("Vui lòng nhập đủ: Tiêu đề, Tác giả và Nội dung", "error");
      return;
    }

    try {
      if (isEditMode && editingId) {
        await updatePost(editingId, formData);
        showToast("Cập nhật thành công", "success");
      } else {
        await createPost(formData);
        showToast("Tạo bài viết thành công", "success");
      }
      setOpenModal(false);
      fetchPosts(currentPage); // Refresh list -> trigger useMemo -> cập nhật month filter
    } catch (error) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  return (
    <div
      style={{
        background: "#F5EFEB",
        borderRadius: "40px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div
        style={{
          maxWidth: "1200px",
          margin: "2rem auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: "2rem",
          padding: "0 2rem",
          boxSizing: "border-box",
        }}
      >
        <SideBar selectedMenu="Quản lý bài viết" />

        {/* CONTENT */}
        <Box
          sx={{
            backgroundColor: "#D3E2E9",
            borderRadius: "24px",
            p: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          {/* HEADER SECTION */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#2C3E50" }}>
              Quản lý bài viết
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#567C8D",
                textTransform: "none",
                fontWeight: 600,
              }}
              onClick={handleOpenAdd}
            >
              Thêm mới
            </Button>
          </Box>

          {/* FILTER BAR */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              gap: 1.5, // Giảm gap chút xíu cho gọn
              flexWrap: "nowrap", // <--- QUAN TRỌNG: Không cho phép xuống dòng
              backgroundColor: "white",
              overflowX: "auto", // Thêm cuộn ngang nếu màn hình quá bé
              "&::-webkit-scrollbar": { display: "none" }, // Ẩn thanh cuộn cho đẹp (tuỳ chọn)
            }}
          >
            <TextField
              placeholder="Tìm tiêu đề..."
              size="small"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              // Thay width cố định bằng minWidth để co giãn tốt hơn
              sx={{ minWidth: 200, bgcolor: "#f9f9f9" }}
            />

            {/* Select Tháng */}
            <Select
              size="small"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              displayEmpty
              sx={{ minWidth: 160, bgcolor: "#f9f9f9" }}
            >
              <MenuItem value="All">Toàn bộ thời gian</MenuItem>
              {availableMonths.map((m) => {
                const [year, month] = m.split("-");
                return (
                  <MenuItem key={m} value={m}>
                    Tháng {month}/{year}
                  </MenuItem>
                );
              })}
            </Select>

            {/* Select Danh mục */}
            <Select
              size="small"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              displayEmpty
              sx={{ minWidth: 150, bgcolor: "#f9f9f9" }}
            >
              <MenuItem value="All">Tất cả chủ đề</MenuItem>
              <MenuItem value="Phối đồ">Phối đồ</MenuItem>
              <MenuItem value="Xu hướng">Xu hướng</MenuItem>
              <MenuItem value="Review">Review</MenuItem>
            </Select>

            {/* Nút Lọc */}
            <Button
              variant="contained"
              sx={{
                bgcolor: "#2C3E50",
                textTransform: "none",
                whiteSpace: "nowrap", // Giữ chữ không bị ngắt dòng
                minWidth: "fit-content",
              }}
              startIcon={<FilterListIcon />}
              onClick={handleFilter}
            >
              Lọc
            </Button>

            {/* Nút Đặt lại */}
            <Button
              variant="outlined"
              color="error"
              sx={{
                textTransform: "none",
                borderColor: "#e74c3c",
                color: "#e74c3c",
                whiteSpace: "nowrap", // Giữ chữ không bị ngắt dòng
                minWidth: "fit-content",
              }}
              startIcon={<RestartAltIcon />}
              onClick={handleResetFilter}
            >
              Đặt lại
            </Button>
          </Paper>

          {/* TABLE HEADER */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: TABLE_GRID,
              backgroundColor: "#567C8D",
              color: "white",
              py: 1.5,
              px: 1,
              borderRadius: "12px 12px 0 0",
              fontWeight: 600,
              fontSize: "0.8rem",
              textAlign: "center",
            }}
          >
            <Box>#</Box>
            <Box sx={{ textAlign: "left", pl: 1 }}>Tiêu đề bài viết</Box>
            <Box>Danh mục</Box>
            <Box sx={{ textAlign: "left", pl: 1 }}>Nội dung tóm tắt</Box>
            <Box>Tác giả</Box>
            <Box>Trạng thái</Box>
            <Box>Tùy chỉnh</Box>
          </Box>

          {/* LIST ITEMS */}
          <Stack spacing={1} sx={{ mt: 1 }}>
            {loading && (
              <CircularProgress sx={{ alignSelf: "center", my: 2 }} />
            )}

            {!loading && posts.length === 0 && (
              <Typography align="center" color="text.secondary" py={4}>
                Không tìm thấy bài viết nào
              </Typography>
            )}

            {!loading &&
              posts.map((post, index) => (
                <Box
                  key={post.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: TABLE_GRID,
                    backgroundColor: "white",
                    py: 1.5,
                    px: 1,
                    borderRadius: "8px",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Typography color="#7f8c8d" fontWeight={500}>
                    {index + 1 + (currentPage - 1) * pageSize}
                  </Typography>

                  <Box sx={{ textAlign: "left", pl: 1, overflow: "hidden" }}>
                    <Typography
                      fontWeight={600}
                      fontSize="0.9rem"
                      color="#2C3E50"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {post.title}
                    </Typography>
                    {/* Hiển thị ngày tạo bên dưới title nếu cần */}
                    <Typography
                      fontSize="0.7rem"
                      color="#999"
                      fontStyle="italic"
                    >
                      {post.createdAt}
                    </Typography>
                  </Box>

                  <Box>
                    <Chip
                      label={post.category}
                      size="small"
                      sx={{
                        bgcolor: "#ECEFF1",
                        color: "#455A64",
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Typography
                    fontSize="0.85rem"
                    color="#666"
                    textAlign="left"
                    pl={1}
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {post.content}
                  </Typography>

                  <Typography
                    fontSize="0.85rem"
                    fontWeight={500}
                    color="#2C3E50"
                  >
                    {post.author}
                  </Typography>

                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                    onClick={() => handleToggleStatus(post)}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor:
                          post.status === "active" ? "#00bcd4" : "#ff9800",
                        mr: 0.5,
                      }}
                    />
                    {post.status === "active" ? (
                      <Typography
                        fontSize="0.75rem"
                        fontWeight={700}
                        color="#00bcd4"
                      >
                        Hiển thị
                      </Typography>
                    ) : (
                      <Typography
                        fontSize="0.75rem"
                        fontWeight={700}
                        color="#555"
                      >
                        Ẩn
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEdit(post)}
                    >
                      <EditIcon fontSize="small" color="primary" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: "#e74c3c" }}
                      onClick={() => handleDelete(post.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
          </Stack>

          {/* PAGINATION */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 1 }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Box
                key={p}
                onClick={() => setCurrentPage(p)}
                sx={{
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  cursor: "pointer",
                  bgcolor: currentPage === p ? "#2C3E50" : "#E0E0E0",
                  color: currentPage === p ? "white" : "#333",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {p}
              </Box>
            ))}
          </Box>
        </Box>
      </div>
      <Footer />

      {/* --- MODAL (ADD / EDIT) --- */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 700,
            color: "#3B4A6B",
            fontSize: "1.25rem",
          }}
        >
          {isEditMode ? "Chỉnh sửa bài viết" : "Tạo bài viết"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2.5 }}
          >
            <Box>
              <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
                Tiêu đề bài viết
              </Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Nhập tiêu đề..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                sx={{
                  bgcolor: "#fff",
                  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                }}
              />
            </Box>

            {/* --- FIX GRID ITEM ERROR (MUI v6) --- */}
            <Grid container spacing={3}>
              <Grid size={6}>
                <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
                  Danh mục
                </Typography>
                <Select
                  fullWidth
                  size="small"
                  displayEmpty
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="Phối đồ">Phối đồ</MenuItem>
                  <MenuItem value="Xu hướng">Xu hướng</MenuItem>
                  <MenuItem value="Review">Review</MenuItem>
                </Select>
              </Grid>

              <Grid size={6}>
                <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
                  Tác giả
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Nhập tên tác giả..."
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  sx={{
                    bgcolor: "#fff",
                    "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                  }}
                />
              </Grid>
            </Grid>
            {/* ------------------------------------ */}

            <Box>
              <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
                Ảnh thumbnail
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Chọn tệp"
                  value={formData.thumbnail}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <UploadFileIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                    cursor: "pointer",
                  }}
                />
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Box>
            </Box>

            <Box>
              <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
                Nội dung chi tiết
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Nhập nội dung bài viết..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": { borderRadius: "12px" },
                }}
              />
            </Box>

            {isEditMode && (
              <Box>
                <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
                  Trạng thái
                </Typography>
                <Select
                  fullWidth
                  size="small"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "active" | "hidden",
                    })
                  }
                  sx={{ borderRadius: "8px" }}
                >
                  <MenuItem value="active">Hiển thị</MenuItem>
                  <MenuItem value="hidden">Ẩn</MenuItem>
                </Select>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              bgcolor: "#567C8D",
              px: 5,
              py: 1,
              borderRadius: "8px",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#4a6b7c" },
            }}
          >
            {isEditMode ? "Lưu thay đổi" : "Tạo bài viết"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Posts;
