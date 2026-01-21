import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";

// Import Modals
import UpdateProfileModal, { type ProfileData } from "./UpdateProfileModal";
import UpdateAddressModal, {
  type AddressFormState as UpdateAddressState,
} from "./UpdateAddressModal";
import AddAddressModal, { type AddressFormState } from "./AddAddressModal";

import { useToast } from "../../../../context/useToast";

// Import Services
import {
  getUserProfile,
  updateUserProfile,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
} from "../../../../services/userProfileServices";
import type {
  UserProfile,
  Address,
} from "../../../../services/userProfileServices";

const ProfileInfo = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);

  // Lấy UserID (Ví dụ lấy từ localStorage hoặc Context)
  // Bạn cần đảm bảo logic lấy ID này đúng với cách app bạn đang hoạt động
  const currentUserId =
    localStorage.getItem("userId") || "69206c045dee2bcc7351a962"; // Fallback ID ví dụ

  const [userData, setUserData] = useState<UserProfile | null>(null);

  // Modal States
  const [openModal, setOpenModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // --- 1. HÀM FETCH DATA ---
  const fetchUserProfile = useCallback(async () => {
    try {
      if (!userData) setLoading(true); // Chỉ hiện loading lần đầu hoặc khi cần thiết
      const data = await getUserProfile(currentUserId);
      setUserData(data);
    } catch (error) {
      showToast("Lỗi tải thông tin người dùng", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentUserId, showToast]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // --- 2. XỬ LÝ CẬP NHẬT PROFILE ---
  const handleUpdateProfile = async (newData: ProfileData) => {
    try {
      // Backend yêu cầu formData, service đã xử lý việc này
      await updateUserProfile(currentUserId, {
        displayName: newData.displayName, // Mapping đúng field
        phone: newData.phone,
        username: newData.username,
        avatar: newData.avatar, // File hoặc URL string
      });

      showToast("Cập nhật thông tin thành công", "success");
      fetchUserProfile(); // Load lại data mới nhất từ server
      setOpenModal(false);
    } catch (error) {
      showToast("Cập nhật thất bại", "error");
    }
  };

  // --- 3. XỬ LÝ ĐỊA CHỈ ---
  // Lưu ý: Sau khi Thêm/Sửa/Xóa địa chỉ, ta gọi lại fetchUserProfile()
  // để lấy danh sách địa chỉ mới nhất được cập nhật trong User Object.

  const handleAddNewAddress = async (newAddr: AddressFormState) => {
    try {
      await addUserAddress({
        street: newAddr.street,
        ward: newAddr.ward,
        district: newAddr.district,
        city: newAddr.city,
        country: newAddr.country,
        isDefault: newAddr.isDefault,
      });

      showToast("Thêm địa chỉ thành công", "success");
      fetchUserProfile(); // Refresh data
      setOpenAddModal(false);
    } catch (error) {
      showToast("Thêm địa chỉ thất bại", "error");
    }
  };

  const handleUpdateAddress = async (updatedData: UpdateAddressState) => {
    if (!selectedAddress) return;
    try {
      await updateUserAddress(selectedAddress.addressId, {
        street: updatedData.street,
        ward: updatedData.ward,
        district: updatedData.district,
        city: updatedData.city,
        country: updatedData.country,
        isDefault: updatedData.isDefault,
      });

      showToast("Cập nhật địa chỉ thành công", "success");
      fetchUserProfile();
      setOpenAddressModal(false);
    } catch (error: any) {
      console.error("Lỗi cập nhật địa chỉ:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        "Cập nhật địa chỉ thất bại (Lỗi dữ liệu)";
      showToast(errorMessage, "error");
    }
  };

  const handleDeleteAddress = async () => {
    if (!selectedAddress) return;
    try {
      await deleteUserAddress(selectedAddress.addressId); // Dùng addressId

      showToast("Xóa địa chỉ thành công", "success");
      fetchUserProfile(); // Refresh data
      setOpenAddressModal(false);
    } catch (error) {
      showToast("Xóa địa chỉ thất bại", "error");
    }
  };

  // Helper mở modal sửa
  const handleAddressClick = (addr: Address) => {
    setSelectedAddress(addr);
    setOpenAddressModal(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) return null;

  return (
    <Box sx={{ width: "100%", pl: { md: 4 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#2C3E50",
            fontFamily: '"Lexend", sans-serif',
            textAlign: "left",
          }}
        >
          Hồ sơ của tôi
        </Typography>
        <Typography
          sx={{
            color: "#567C8D",
            fontSize: "0.95rem",
            fontFamily: '"Lexend", sans-serif',
            textAlign: "left",
          }}
        >
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </Typography>
      </Box>

      {/* --- USER INFO CARD --- */}
      <Box
        sx={{
          bgcolor: "#D0E1E9",
          borderRadius: "20px",
          p: { xs: 3, md: 5 },
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          mb: 6,
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={7} lg={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                textAlign: "left",
              }}
            >
              <InfoRow label="Username" value={userData.username} />
              <InfoRow label="Name" value={userData.displayName} />{" "}
              {/* Dùng displayName */}
              <InfoRow label="Email" value={userData.email} />
              <InfoRow label="Phone number" value={userData.phone} />
              <InfoRow label="Orders" value={userData.orderCount.toString()} />
              <InfoRow
                label="Total Spent"
                value={userData.totalSpent.toLocaleString() + " đ"}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={userData.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: "4px solid white",
                }}
              />
              <Typography
                sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#2C3E50" }}
              >
                {userData.displayName}
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "white", mb: 3 }}>
                {userData.email}
              </Typography>
              <Button
                onClick={() => setOpenModal(true)}
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "#2C3E50",
                  borderRadius: "30px",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                Cập nhập hồ sơ
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* --- ADDRESS LIST --- */}
      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{ color: "#567C8D", fontWeight: 600, textAlign: "left" }}
        >
          Địa chỉ đặt hàng
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "#D0E1E9",
          borderRadius: "20px",
          p: { xs: 3, md: 4 },
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {userData.addresses &&
            userData.addresses.map((addr) => (
              <Box
                key={addr.addressId} // Dùng addressId
                onClick={() => handleAddressClick(addr)}
                sx={{
                  bgcolor: "white",
                  borderRadius: "10px",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                }}
              >
                {/* Hiển thị chuỗi Address từ Backend hoặc tự ghép */}
                <Typography
                  sx={{ fontWeight: 700, color: "#2C3E50", fontSize: "0.9rem" }}
                >
                  {addr.Address ||
                    `${addr.street}, ${addr.ward}, ${addr.district}, ${addr.city}`}
                </Typography>
                {addr.isDefault && (
                  <Typography
                    sx={{
                      fontSize: "0.75rem",
                      color: "#99AAB5",
                      fontStyle: "italic",
                      ml: 2,
                    }}
                  >
                    Mặc định
                  </Typography>
                )}
              </Box>
            ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => setOpenAddModal(true)}
            sx={{
              borderRadius: "30px",
              color: "#2C3E50",
              borderColor: "#2C3E50",
              bgcolor: "white",
              "&:hover": { bgcolor: "#f5f5f5", borderColor: "#2C3E50" },
            }}
          >
            Thêm địa chỉ
          </Button>
        </Box>
      </Box>

      {/* --- MODALS --- */}
      <UpdateProfileModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        initialData={{
          username: userData.username,
          displayName: userData.displayName, // Map đúng
          phone: userData.phone,
          avatar: userData.avatar,
        }}
        onUpdate={handleUpdateProfile}
      />

      <UpdateAddressModal
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
        // Truyền chuỗi địa chỉ để modal hiển thị hoặc tự parse lại trong modal
        // Vì Modal này đang parse chuỗi string, ta nên truyền Address string từ backend
        addressString={selectedAddress?.Address || ""}
        isDefault={selectedAddress?.isDefault || false}
        onDelete={handleDeleteAddress}
        onUpdate={handleUpdateAddress}
      />

      <AddAddressModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddNewAddress}
      />
    </Box>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
    <Typography
      sx={{
        width: { xs: "120px", sm: "150px" },
        fontWeight: 800,
        color: "#2C3E50",
        flexShrink: 0,
      }}
    >
      {label}:
    </Typography>
    <Typography
      sx={{ color: "#567C8D", fontWeight: 500, wordBreak: "break-word" }}
    >
      {value}
    </Typography>
  </Box>
);

export default ProfileInfo;
