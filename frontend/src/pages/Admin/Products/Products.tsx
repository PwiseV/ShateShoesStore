import React, { useState, useEffect, type ChangeEvent } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Chip,
  CircularProgress,
  Stack,
  Paper,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Import Layout
import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";

// Import Services & Types
import {
  getProducts,
  deleteProduct,
  createProduct,
  addProductSize,
  addSizeColor,
  updateProduct,
  updateProductColor,
  deleteProductColor,
  deleteProductSize,
} from "../../../services/fakeAdminProductServices";

import type {
  Product,
  SizeOption,
  Colors,
} from "../../../services/adminProductServices";

// --- MOCK Context ---
const useToast = () => {
  return {
    showToast: (msg: string, type: "success" | "error") => {
      console.log(`[${type.toUpperCase()}] ${msg}`);
    },
  };
};

const Products: React.FC = () => {
  const TABLE_GRID = "50px 80px 70px 1.2fr 110px 70px 80px 100px 70px 60px";
  const { showToast } = useToast();

  useEffect(() => {
    document.title = "SHATE - Quản lý sản phẩm";
    window.scrollTo(0, 0);
  }, []);

  /* =======================
     Data & Logic
  ======================= */
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);

  // Data States
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // --- FILTER STATES ---
  const [keyword, setKeyword] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterMinPrice, setFilterMinPrice] = useState("");
  const [filterMaxPrice, setFilterMaxPrice] = useState("");

  // Selection States
  const [selectedSizes, setSelectedSizes] = useState<Record<number, number>>(
    {}
  );
  const [selectedColors, setSelectedColors] = useState<Record<number, number>>(
    {}
  );

  // Tags Logic
  const [tagInput, setTagInput] = useState<string>("");
  const [productTags, setProductTags] = useState<string[]>([]);

  // Modal States
  const [openModal, setOpenModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingColor, setEditingColor] = useState<Colors | null>(null);
  const [editingColorIndices, setEditingColorIndices] = useState<{
    sIdx: number;
    cIdx: number;
  } | null>(null);

  // Form Data
  const [formData, setFormData] = useState({
    productId: "",
    title: "",
    category: "Classic",
    description: "",
    avatar: "",
    tags: [] as string[],
  });

  // Helper States
  const [sizes, setSizes] = useState<SizeOption[]>([]);
  const [currentSizeIndex, setCurrentSizeIndex] = useState(0);
  const [newSizeInput, setNewSizeInput] = useState("");

  const [newColorInput, setNewColorInput] = useState({
    color: "Hồng",
    price: "",
    stock: "",
    avatar: "",
  });
  const [colorPreviewUrl, setColorPreviewUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Constants
  const colorOptions = [
    "Hồng",
    "Xanh",
    "Vàng",
    "Đen",
    "Trắng",
    "Xám",
    "Không có",
  ];
  const colorMap: Record<string, string> = {
    Hồng: "red",
    Xanh: "blue",
    Vàng: "yellow",
    Đen: "black",
    Trắng: "white",
    Xám: "gray",
    "Không có": "gray",
  };
  const colorDisplayMap: Record<string, string> = {
    red: "#FF6B6B",
    yellow: "#FFD93D",
    blue: "#6bb8cf",
    black: "#333",
    white: "#fff",
    gray: "#CCC",
  };

  /* =======================
     API CALLS
  ======================= */
  const fetchProducts = async (page = currentPage) => {
    setLoading(true);
    try {
      const res = await getProducts({
        page,
        pageSize,
        keyword: keyword,
        category: filterCategory,
        minPrice: filterMinPrice ? Number(filterMinPrice) : undefined,
        maxPrice: filterMaxPrice ? Number(filterMaxPrice) : undefined,
      });
      setProductsData(res.data);
      setTotalPages(Math.ceil(res.total / pageSize));

      const sizesInit: Record<number, number> = {};
      const colorsInit: Record<number, number> = {};
      res.data.forEach((p) => {
        sizesInit[p.id] = 0;
        colorsInit[p.id] = 0;
      });
      setSelectedSizes((prev) => ({ ...prev, ...sizesInit }));
      setSelectedColors((prev) => ({ ...prev, ...colorsInit }));
    } catch (err) {
      console.error(err);
      showToast("Lỗi khi tải danh sách sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // --- Filter Handlers ---
  const handleFilter = () => {
    setCurrentPage(1);
    fetchProducts(1);
  };

  const handleResetFilter = () => {
    setKeyword("");
    setFilterCategory("All");
    setFilterMinPrice("");
    setFilterMaxPrice("");
    setCurrentPage(1);
    getProducts({ page: 1, pageSize, keyword: "", category: "All" }).then(
      (res) => {
        setProductsData(res.data);
        setTotalPages(Math.ceil(res.total / pageSize));
      }
    );
  };

  /* =======================
     EVENT HANDLERS
  ======================= */

  useEffect(() => {
    const tagsFromData = formData?.tags;
    if (tagsFromData && Array.isArray(tagsFromData)) {
      setProductTags(tagsFromData);
    } else {
      setProductTags([]);
    }
  }, [formData.tags]);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !productTags.includes(val)) {
        const updatedTags = [...productTags, val];
        setProductTags(updatedTags);
        handleFormChange("tags", updatedTags);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToDelete: string) => {
    const updatedTags = productTags.filter((tag) => tag !== tagToDelete);
    setProductTags(updatedTags);
    handleFormChange("tags", updatedTags);
  };

  const handleSizeChange = (productId: number, sizeIndex: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: sizeIndex }));
    setSelectedColors((prev) => ({ ...prev, [productId]: 0 }));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    setLoading(true);
    try {
      await deleteProduct(id);
      showToast("Xóa sản phẩm thành công", "success");
      await fetchProducts(currentPage);
    } catch (err) {
      showToast("Lỗi khi xóa sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
        setFormData((prev) => ({
          ...prev,
          avatar: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setColorPreviewUrl(base64);
        setNewColorInput((prev) => ({ ...prev, avatar: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- NEW: Handle Image Change for Editing Color Detail ---
  const handleEditColorImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file && editingColor) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setEditingColor({ ...editingColor, avatar: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.productId.trim())
      errors.productId = "Mã sản phẩm không được để trống";
    if (!formData.title.trim())
      errors.title = "Tên sản phẩm không được để trống";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- Create Logic ---
  const handleOpenModal = () => {
    setOpenModal(true);
    setModalStep(1);
    setFormData({
      productId: "",
      title: "",
      category: "Classic",
      description: "",
      avatar: "",
      tags: [],
    });
    setSizes([]);
    setProductTags([]);
    setPreviewUrl("");
    setFormErrors({});
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalStep(1);
  };

  const handleAddSize = () => {
    if (!newSizeInput.trim()) {
      setFormErrors({ size: "Nhập kích cỡ" });
      return;
    }
    const newSize: SizeOption = {
      sizeID: Date.now(),
      size: newSizeInput,
      colors: [],
    };
    setSizes([...sizes, newSize]);
    setCurrentSizeIndex(sizes.length);
    setNewSizeInput("");
    setFormErrors({});
  };

  const handleRemoveSize = (index: number) => {
    const updated = sizes.filter((_, i) => i !== index);
    setSizes(updated);
    if (currentSizeIndex >= updated.length)
      setCurrentSizeIndex(Math.max(0, updated.length - 1));
  };

  const handleAddColor = () => {
    if (!newColorInput.price || !newColorInput.stock) {
      setFormErrors({ color: "Nhập giá và tồn kho" });
      return;
    }
    const currentSize = sizes[currentSizeIndex];
    if (!currentSize) return;

    const mappedColor = colorMap[newColorInput.color] || newColorInput.color;
    const newColor: Colors = {
      colorId: Date.now(),
      color: mappedColor,
      price: parseInt(newColorInput.price),
      stock: parseInt(newColorInput.stock),
      avatar: newColorInput.avatar,
    };

    const updatedSizes = [...sizes];
    updatedSizes[currentSizeIndex].colors.push(newColor);
    setSizes(updatedSizes);

    setNewColorInput({ color: "Hồng", price: "", stock: "", avatar: "" });
    setColorPreviewUrl("");
    setFormErrors({});
  };

  const handleRemoveColor = (colorIndex: number) => {
    const updatedSizes = [...sizes];
    updatedSizes[currentSizeIndex].colors = updatedSizes[
      currentSizeIndex
    ].colors.filter((_, i) => i !== colorIndex);
    setSizes(updatedSizes);
  };

  const handleCreateProduct = async () => {
    if (sizes.length === 0 || sizes.some((s) => s.colors.length === 0)) {
      setFormErrors({ submit: "Cần ít nhất 1 size và 1 màu" });
      return;
    }
    setLoading(true);
    try {
      const newProduct = await createProduct({
        ...formData,
        sizes: [],
      });

      for (const size of sizes) {
        const createdSize = await addProductSize(newProduct.id, {
          size: size.size,
          colors: [],
        });
        for (const color of size.colors) {
          await addSizeColor(createdSize.sizeID, {
            color: color.color,
            price: color.price,
            stock: color.stock,
            avatar: color.avatar,
          });
        }
      }
      showToast("Tạo thành công", "success");
      handleCloseModal();
      fetchProducts(1);
    } catch (e) {
      showToast("Lỗi tạo sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (modalStep === 1) {
      if (validateForm()) setModalStep(2);
    } else if (modalStep === 2) {
      if (sizes.length === 0) setFormErrors({ size: "Thêm ít nhất 1 size" });
      else setModalStep(3);
    }
  };

  // --- Edit Logic ---
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      productId: product.productId,
      title: product.title,
      category: product.category,
      description: product.description,
      avatar: product.avatar,
      tags: product.tags || [],
    });
    setSizes(JSON.parse(JSON.stringify(product.sizes)));
    setEditModalOpen(true);
  };

  const handleOpenColorEdit = (sIdx: number, cIdx: number) => {
    const colorToEdit = sizes[sIdx].colors[cIdx];
    setEditingColor(colorToEdit);
    setEditingColorIndices({ sIdx, cIdx });
  };

  const handleUpdateColorDetail = () => {
    if (!editingColor || !editingColorIndices) return;
    const { sIdx, cIdx } = editingColorIndices;
    const newSizes = [...sizes];
    newSizes[sIdx].colors[cIdx] = editingColor;
    setSizes(newSizes);
    setEditingColor(null);
    setEditingColorIndices(null);
  };

  const handleDeleteSizeInEdit = async (index: number) => {
    const sizeToDelete = sizes[index];
    if (
      !window.confirm(`Xóa size ${sizeToDelete.size} và tất cả màu bên trong?`)
    )
      return;

    const isExisting = editingProduct?.sizes.some(
      (s) => s.sizeID === sizeToDelete.sizeID
    );

    if (isExisting) {
      setLoading(true);
      try {
        await deleteProductSize(sizeToDelete.sizeID);
        showToast("Đã xóa size", "success");
        const newSizes = sizes.filter((_, i) => i !== index);
        setSizes(newSizes);
        fetchProducts(currentPage);
      } catch (e) {
        showToast("Lỗi khi xóa size", "error");
      } finally {
        setLoading(false);
      }
    } else {
      const newSizes = sizes.filter((_, i) => i !== index);
      setSizes(newSizes);
    }
  };

  const handleDeleteColorInEdit = async () => {
    if (!editingColor || !editingColorIndices) return;
    if (!window.confirm("Xóa màu này?")) return;

    const { sIdx, cIdx } = editingColorIndices;
    const isExisting = editingProduct?.sizes[sIdx]?.colors.some(
      (c) => c.colorId === editingColor.colorId
    );

    if (isExisting) {
      setLoading(true);
      try {
        await deleteProductColor(editingColor.colorId);
        showToast("Đã xóa màu", "success");
        const newSizes = [...sizes];
        newSizes[sIdx].colors = newSizes[sIdx].colors.filter(
          (_, i) => i !== cIdx
        );
        setSizes(newSizes);
        setEditingColor(null);
        fetchProducts(currentPage);
      } catch (e) {
        showToast("Lỗi khi xóa màu", "error");
      } finally {
        setLoading(false);
      }
    } else {
      const newSizes = [...sizes];
      newSizes[sIdx].colors = newSizes[sIdx].colors.filter(
        (_, i) => i !== cIdx
      );
      setSizes(newSizes);
      setEditingColor(null);
    }
  };

  const handleSaveProductEdit = async () => {
    if (!editingProduct) return;
    setLoading(true);
    try {
      await updateProduct(editingProduct.id, formData);
      const originalSizes = editingProduct.sizes;

      for (const s of sizes) {
        const existingSize = originalSizes.find((os) => os.sizeID === s.sizeID);
        if (!existingSize) {
          const newSize = await addProductSize(editingProduct.id, {
            size: s.size,
            colors: [],
          });
          for (const c of s.colors) {
            await addSizeColor(newSize.sizeID, {
              color: c.color,
              price: c.price,
              stock: c.stock,
              avatar: c.avatar,
            });
          }
        } else {
          for (const c of s.colors) {
            const existingColor = existingSize.colors.find(
              (oc) => oc.colorId === c.colorId
            );
            if (!existingColor) {
              await addSizeColor(existingSize.sizeID, {
                color: c.color,
                price: c.price,
                stock: c.stock,
                avatar: c.avatar,
              });
            } else {
              // Check for ANY changes including avatar
              if (
                existingColor.price !== c.price ||
                existingColor.stock !== c.stock ||
                existingColor.avatar !== c.avatar
              ) {
                await updateProductColor(c.colorId, {
                  price: c.price,
                  stock: c.stock,
                  avatar: c.avatar,
                });
              }
            }
          }
        }
      }
      showToast("Cập nhật thành công", "success");
      setEditModalOpen(false);
      setEditingProduct(null);
      fetchProducts(currentPage);
    } catch (e) {
      showToast("Lỗi cập nhật", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- Render ---
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
        <SideBar selectedMenu="Quản lý sản phẩm" />

        {/* CONTENT */}
        <Box
          sx={{
            backgroundColor: "#D3E2E9",
            borderRadius: "24px",
            p: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#2C3E50" }}>
              Quản lý sản phẩm
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ backgroundColor: "#567C8D" }}
              onClick={handleOpenModal}
            >
              Thêm mới
            </Button>
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <TextField
              placeholder="Tìm kiếm SP..."
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
              sx={{ width: 250 }}
            />

            <Select
              size="small"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              sx={{ width: 150 }}
            >
              <MenuItem value="All">Tất cả loại</MenuItem>
              <MenuItem value="Classic">Classic</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Sale">Sale</MenuItem>
              <MenuItem value="Trending">Trending</MenuItem>
            </Select>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                placeholder="Giá Min"
                size="small"
                type="number"
                value={filterMinPrice}
                onChange={(e) => setFilterMinPrice(e.target.value)}
                sx={{ width: 100 }}
              />
              <Typography>-</Typography>
              <TextField
                placeholder="Giá Max"
                size="small"
                type="number"
                value={filterMaxPrice}
                onChange={(e) => setFilterMaxPrice(e.target.value)}
                sx={{ width: 100 }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{ bgcolor: "#2C3E50" }}
              startIcon={<FilterListIcon />}
              onClick={handleFilter}
            >
              Lọc
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<RestartAltIcon />}
              onClick={handleResetFilter}
            >
              Xóa
            </Button>
          </Paper>

          {/* Table Header */}
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
            <Box>Mã SP</Box>
            <Box>Hình</Box>
            <Box>Tên sản phẩm</Box>
            <Box>Giá</Box>
            <Box>Loại</Box>
            <Box>Size</Box>
            <Box>Màu sắc</Box>
            <Box>Tồn kho</Box>
            <Box>Tùy chỉnh</Box>
          </Box>

          {/* List */}
          <Stack spacing={1.5} sx={{ mt: 1.5 }}>
            {loading && (
              <CircularProgress sx={{ alignSelf: "center", my: 2 }} />
            )}
            {!loading && productsData.length === 0 && (
              <Typography align="center" color="text.secondary" py={4}>
                Chưa có sản phẩm nào
              </Typography>
            )}

            {!loading &&
              productsData.map((product, index) => {
                const sizeIdx = selectedSizes[product.id] ?? 0;
                const currentSize = product.sizes[sizeIdx] || {
                  size: "N/A",
                  colors: [],
                };
                const colorIdx = selectedColors[product.id] ?? 0;
                const currentColor =
                  currentSize.colors[colorIdx] || currentSize.colors[0];
                const displayImage = currentColor?.avatar || product.avatar;

                return (
                  <Box
                    key={product.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: TABLE_GRID,
                      backgroundColor: "white",
                      py: 2,
                      px: 1,
                      borderRadius: "12px",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                    }}
                  >
                    <Typography color="#7f8c8d">
                      {index + 1 + (currentPage - 1) * pageSize}
                    </Typography>
                    <Typography
                      fontWeight={600}
                      fontSize="0.85rem"
                      color="#2C3E50"
                    >
                      {product.productId}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={displayImage}
                        alt=""
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 4,
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Typography
                      fontWeight={600}
                      textAlign="left"
                      pl={1}
                      fontSize="0.9rem"
                      color="#2C3E50"
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      fontWeight={700}
                      fontSize="0.9rem"
                      color="#2C3E50"
                    >
                      {currentColor?.price.toLocaleString() || "---"}
                    </Typography>
                    <Typography color="#7f8c8d" fontSize="0.85rem">
                      {product.category}
                    </Typography>

                    <Select
                      value={sizeIdx}
                      onChange={(e) =>
                        handleSizeChange(product.id, Number(e.target.value))
                      }
                      size="small"
                      sx={{ height: 28, fontSize: "0.75rem", color: "#2C3E50" }}
                    >
                      {product.sizes.map((s, idx) => (
                        <MenuItem key={s.sizeID} value={idx}>
                          {s.size}
                        </MenuItem>
                      ))}
                    </Select>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 0.5,
                      }}
                    >
                      {currentSize.colors.map((c, idx) => (
                        <Box
                          key={c.colorId}
                          onClick={() =>
                            setSelectedColors((p) => ({
                              ...p,
                              [product.id]: idx,
                            }))
                          }
                          sx={{
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            bgcolor: colorDisplayMap[c.color] || "#ccc",
                            border:
                              (selectedColors[product.id] ?? 0) === idx
                                ? "2px solid #2C3E50"
                                : "1px solid #ddd",
                            cursor: "pointer",
                          }}
                        />
                      ))}
                    </Box>

                    <Typography fontWeight={700} color="#2C3E50">
                      {currentColor?.stock || 0}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        sx={{ color: "#567C8D" }}
                        onClick={() => handleEditProduct(product)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: "#567C8D" }}
                        onClick={() => handleDelete(product.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
          </Stack>

          {/* Pagination */}
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Box
                key={p}
                onClick={() => setCurrentPage(p)}
                sx={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  cursor: "pointer",
                  bgcolor: currentPage === p ? "#2C3E50" : "transparent",
                  color: currentPage === p ? "white" : "#2C3E50",
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

      {/* CREATE MODAL (Same as before) */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {modalStep === 1
            ? "Thêm SP Mới"
            : modalStep === 2
            ? "Thêm Size"
            : "Thêm Màu"}
        </DialogTitle>
        <DialogContent dividers>
          {modalStep === 1 && (
            <Stack spacing={2}>
              <TextField
                label="Mã SP"
                fullWidth
                size="small"
                value={formData.productId}
                onChange={(e) => handleFormChange("productId", e.target.value)}
                error={!!formErrors.productId}
              />
              <TextField
                label="Tên SP"
                fullWidth
                size="small"
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                error={!!formErrors.title}
              />
              <TextField
                select
                label="Danh mục"
                fullWidth
                size="small"
                value={formData.category}
                onChange={(e) => handleFormChange("category", e.target.value)}
              >
                <MenuItem value="Classic">Classic</MenuItem>
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Sale">Sale</MenuItem>
              </TextField>
              <TextField
                label="Tags (Enter)"
                fullWidth
                size="small"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {productTags.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    onDelete={() => handleRemoveTag(t)}
                    size="small"
                  />
                ))}
              </Box>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
              >
                Upload Ảnh Chính{" "}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
              {formData.avatar && (
                <img
                  src={formData.avatar}
                  alt="Preview"
                  style={{ height: 80, objectFit: "contain" }}
                />
              )}
            </Stack>
          )}
          {modalStep === 2 && (
            <Stack spacing={2}>
              {sizes.map((s, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    bgcolor: "#f5f5f5",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography>{s.size}</Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveSize(idx)}
                  >
                    Xóa
                  </Button>
                </Box>
              ))}
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  label="Size mới"
                  fullWidth
                  size="small"
                  value={newSizeInput}
                  onChange={(e) => setNewSizeInput(e.target.value)}
                />
                <Button variant="contained" onClick={handleAddSize}>
                  Thêm
                </Button>
              </Box>
            </Stack>
          )}
          {modalStep === 3 && (
            <Stack spacing={2}>
              <Typography variant="subtitle2">
                Chọn Size để thêm màu:{" "}
                <span style={{ color: "#567C8D" }}>
                  {sizes[currentSizeIndex]?.size}
                </span>
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {sizes.map((s, idx) => (
                  <Button
                    key={idx}
                    variant={
                      currentSizeIndex === idx ? "contained" : "outlined"
                    }
                    onClick={() => setCurrentSizeIndex(idx)}
                    size="small"
                  >
                    {s.size}
                  </Button>
                ))}
              </Box>
              {sizes[currentSizeIndex]?.colors.map((c, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "#f5f5f5",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      bgcolor: colorDisplayMap[c.color] || "#ccc",
                    }}
                  />
                  <Typography flex={1}>
                    {c.color} - {c.price.toLocaleString()}đ (SL: {c.stock})
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleRemoveColor(idx)}
                  >
                    Xóa
                  </Button>
                </Box>
              ))}
              <Box sx={{ border: "1px dashed #ccc", p: 2, borderRadius: 1 }}>
                <Typography variant="caption" fontWeight={600}>
                  Thêm màu mới
                </Typography>
                <Stack spacing={1.5} mt={1}>
                  <Select
                    size="small"
                    value={newColorInput.color}
                    onChange={(e) =>
                      setNewColorInput({
                        ...newColorInput,
                        color: e.target.value,
                      })
                    }
                  >
                    {colorOptions.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Select>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField
                      label="Giá"
                      type="number"
                      size="small"
                      value={newColorInput.price}
                      onChange={(e) =>
                        setNewColorInput({
                          ...newColorInput,
                          price: e.target.value,
                        })
                      }
                      fullWidth
                    />
                    <TextField
                      label="Kho"
                      type="number"
                      size="small"
                      value={newColorInput.stock}
                      onChange={(e) =>
                        setNewColorInput({
                          ...newColorInput,
                          stock: e.target.value,
                        })
                      }
                      fullWidth
                    />
                  </Box>
                  <Button component="label" size="small" variant="outlined">
                    Ảnh màu {colorPreviewUrl && "(Đã chọn)"}{" "}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleColorImageUpload}
                    />
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleAddColor}
                    size="small"
                  >
                    Thêm Màu Này
                  </Button>
                </Stack>
              </Box>
            </Stack>
          )}
          {formErrors.submit && (
            <Typography color="error" mt={2}>
              {formErrors.submit}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
              modalStep === 1
                ? handleCloseModal
                : () => setModalStep(modalStep - 1)
            }
          >
            Quay lại
          </Button>
          {modalStep < 3 && (
            <Button variant="contained" onClick={handleNextStep}>
              Tiếp tục
            </Button>
          )}
          {modalStep === 3 && (
            <Button
              variant="contained"
              onClick={handleCreateProduct}
              disabled={loading}
            >
              Hoàn tất
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* ===== EDIT PRODUCT MODAL ===== */}
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#2C3E50" }}>
          Chỉnh sửa sản phẩm
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Thông tin cơ bản
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Mã sản phẩm"
                  fullWidth
                  size="small"
                  value={formData.productId}
                  onChange={(e) =>
                    handleFormChange("productId", e.target.value)
                  }
                />
                <TextField
                  label="Tên sản phẩm"
                  fullWidth
                  size="small"
                  value={formData.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                />
                <TextField
                  label="Danh mục"
                  select
                  fullWidth
                  size="small"
                  value={formData.category}
                  onChange={(e) => handleFormChange("category", e.target.value)}
                >
                  <MenuItem value="Classic">Classic</MenuItem>
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Sale">Sale</MenuItem>
                </TextField>
                <Box>
                  <TextField
                    label="Tags (Enter để thêm)"
                    fullWidth
                    size="small"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                  />
                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}
                  >
                    {productTags.map((t) => (
                      <Chip
                        key={t}
                        label={t}
                        onDelete={() => handleRemoveTag(t)}
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
                <TextField
                  label="Mô tả"
                  multiline
                  rows={2}
                  fullWidth
                  size="small"
                  value={formData.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                />
              </Stack>
            </Box>
            <Divider />
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Quản lý Biến thể
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                mb={2}
                display="block"
              >
                Click vào Chip màu để sửa giá/tồn kho. Xóa size bằng icon thùng
                rác.
              </Typography>
              {sizes.map((s, idx) => (
                <Box
                  key={idx}
                  sx={{
                    border: "1px solid #eee",
                    p: 1.5,
                    borderRadius: 2,
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography fontWeight="bold">Size: {s.size}</Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteSizeInEdit(idx)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}
                  >
                    {s.colors.map((c, cIdx) => (
                      <Chip
                        key={cIdx}
                        label={`${c.color} (${c.stock})`}
                        size="small"
                        onClick={() => handleOpenColorEdit(idx, cIdx)}
                        sx={{ cursor: "pointer" }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}

              {/* Add New Variant UI in Edit Modal */}
              <Box sx={{ mt: 2, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
                <Typography variant="caption" fontWeight="bold">
                  Thêm Size Mới
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <TextField
                    label="Size"
                    size="small"
                    value={newSizeInput}
                    onChange={(e) => setNewSizeInput(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleAddSize}
                  >
                    Thêm Size
                  </Button>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="caption" fontWeight="bold">
                  Thêm Màu vào Size đang chọn: {sizes[currentSizeIndex]?.size}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  {sizes.map((s, idx) => (
                    <Button
                      key={idx}
                      size="small"
                      variant={currentSizeIndex === idx ? "contained" : "text"}
                      onClick={() => setCurrentSizeIndex(idx)}
                      sx={{ minWidth: 30, px: 1 }}
                    >
                      {s.size}
                    </Button>
                  ))}
                </Box>
                <Box
                  sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center" }}
                >
                  <Select
                    size="small"
                    value={newColorInput.color}
                    onChange={(e) =>
                      setNewColorInput({
                        ...newColorInput,
                        color: e.target.value,
                      })
                    }
                    sx={{ minWidth: 80 }}
                  >
                    {colorOptions.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    placeholder="Giá"
                    size="small"
                    sx={{ width: 80 }}
                    value={newColorInput.price}
                    onChange={(e) =>
                      setNewColorInput({
                        ...newColorInput,
                        price: e.target.value,
                      })
                    }
                  />
                  <TextField
                    placeholder="Kho"
                    size="small"
                    sx={{ width: 60 }}
                    value={newColorInput.stock}
                    onChange={(e) =>
                      setNewColorInput({
                        ...newColorInput,
                        stock: e.target.value,
                      })
                    }
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddColor}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleSaveProductEdit}
            disabled={loading}
          >
            {loading ? "Đang lưu..." : "Cập nhật"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== EDIT COLOR DETAIL MODAL (Updated) ===== */}
      <Dialog
        open={!!editingColor}
        onClose={() => setEditingColor(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#2C3E50" }}>
          Chỉnh sửa chi tiết màu
        </DialogTitle>
        <DialogContent dividers>
          {editingColor && (
            <Stack spacing={2}>
              <Typography variant="subtitle2">
                Màu: <b>{editingColor.color}</b>
              </Typography>

              {/* Image Edit Section */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    border: "1px dashed #ccc",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    bgcolor: "#f9f9f9",
                  }}
                >
                  {editingColor.avatar ? (
                    <img
                      src={editingColor.avatar}
                      alt="Color"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "0.6rem" }}
                    >
                      No Img
                    </Typography>
                  )}
                </Box>
                <Button
                  component="label"
                  variant="outlined"
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  {editingColor.avatar ? "Thay đổi hình" : "Thêm hình ảnh"}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleEditColorImageChange}
                  />
                </Button>
              </Box>

              <TextField
                label="Giá"
                type="number"
                fullWidth
                size="small"
                value={editingColor.price}
                onChange={(e) =>
                  setEditingColor({
                    ...editingColor,
                    price: Number(e.target.value),
                  })
                }
              />
              <TextField
                label="Tồn kho"
                type="number"
                fullWidth
                size="small"
                value={editingColor.stock}
                onChange={(e) =>
                  setEditingColor({
                    ...editingColor,
                    stock: Number(e.target.value),
                  })
                }
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDeleteColorInEdit}>
            Xóa Màu
          </Button>
          <Button onClick={() => setEditingColor(null)}>Hủy</Button>
          <Button variant="contained" onClick={handleUpdateColorDetail}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Products;
