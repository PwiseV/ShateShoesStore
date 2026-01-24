import React, { useState, useEffect } from "react";
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
import ChangePasswordModal from "./ChangePasswordModal";

import { useToast } from "../../../../context/useToast";

// Import Services
import {
  getUserProfile,
  updateUserProfile,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
} from "../../../../services/userProfileServices";
import { changePassword } from "../../../../services/authServices";
import type {
  UserProfile,
  Address,
} from "../../../../services/userProfileServices";

const ProfileInfo = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState<UserProfile | null>(null);

  // Modal States
  const [openModal, setOpenModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // --- 1. HÀM FETCH DATA ---
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      
      // Validate data trước khi set
      if (!data || !data.userId) {
        throw new Error("Invalid user data");
      }
      
      setUserData(data);
    } catch (error: any) {
      console.error("Fetch user profile error:", error);
      const errorMessage = error.message || "Lỗi tải thông tin người dùng";
      showToast(errorMessage, "error");
      
      // Nếu lỗi 401, redirect về login
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Chỉ gọi 1 lần khi mount

  // --- 2. XỬ LÝ CẬP NHẬT PROFILE ---
  const handleUpdateProfile = async (newData: ProfileData) => {
    try {
      // [SỬA LỖI 2] Bỏ tham số currentUserId, chỉ truyền object data
      await updateUserProfile({
        displayName: newData.displayName,
        phone: newData.phone,
        username: newData.username,
        avatar: newData.avatar,
      });

      showToast("Cập nhật thông tin thành công", "success");
      fetchUserProfile(); // Load lại data mới nhất từ server
      setOpenModal(false);
    } catch (error) {
      showToast("Cập nhật thất bại", "error");
      console.error(error);
    }
  };

  // --- 3. XỬ LÝ ĐỊA CHỈ (Giữ nguyên) ---
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
      fetchUserProfile();
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
      await deleteUserAddress(selectedAddress.addressId);

      showToast("Xóa địa chỉ thành công", "success");
      fetchUserProfile();
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

  // --- 4. XỬ LÝ ĐỔI MẬT KHẨU ---
  const handleChangePassword = async (oldPassword: string, newPassword: string) => {
    try {
      await changePassword({ oldPassword, newPassword });
      showToast("Đổi mật khẩu thành công", "success");
      setOpenChangePasswordModal(false);
    } catch (error: any) {
      const errorMessage = error?.message || "Đổi mật khẩu thất bại";
      showToast(errorMessage, "error");
      throw error; // Re-throw to let modal handle loading state
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <Typography variant="h6" color="error">
          Không thể tải thông tin người dùng
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", pl: { md: 4 } }}>
      {/* ... (Phần UI Render giữ nguyên như cũ) ... */}
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
              <InfoRow label="Username" value={userData.username || "N/A"} />
              <InfoRow label="Name" value={userData.displayName || "N/A"} />
              <InfoRow label="Email" value={userData.email || "N/A"} />
              <InfoRow label="Phone number" value={userData.phone || "Chưa cập nhật"} />
              {/* <InfoRow label="Orders" value={(userData.orderCount || 0).toString()} />
              <InfoRow
                label="Total Spent"
                value={(userData.totalSpent || 0).toLocaleString() + " đ"}
              /> */}
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
                src={userData.avatar || undefined}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: "4px solid white",
                }}
              >
                {!userData.avatar && (userData.displayName?.[0] || userData.username?.[0] || "U")}
              </Avatar>
              <Typography
                sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#2C3E50" }}
              >
                {userData.displayName || userData.username || "User"}
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "#2C3E50", mb: 3 }}>
                {userData.email || ""}
              </Typography>
              <Button
                onClick={() => setOpenModal(true)}
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "#2C3E50",
                  borderRadius: "30px",
                  fontWeight: 600,
                  mb: 1.5,
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                Cập nhập hồ sơ
              </Button>
              <Button
                onClick={() => setOpenChangePasswordModal(true)}
                variant="outlined"
                sx={{
                  borderColor: "#2C3E50",
                  color: "#2C3E50",
                  borderRadius: "30px",
                  fontWeight: 570,
                  "&:hover": { 
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "#2C3E50",
                  },
                }}
              >
                Đổi mật khẩu
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
          {userData.addresses && userData.addresses.length > 0 ? (
            userData.addresses.map((addr) => (
              <Box
                key={addr.addressId}
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
            ))
          ) : (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <Typography color="text.secondary">
                Chưa có địa chỉ nào
              </Typography>
            </Box>
          )}
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
          username: userData.username || "",
          displayName: userData.displayName || "",
          phone: userData.phone || "",
          avatar: userData.avatar || "",
        }}
        onUpdate={handleUpdateProfile}
      />

      <UpdateAddressModal
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
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

      <ChangePasswordModal
        open={openChangePasswordModal}
        onClose={() => setOpenChangePasswordModal(false)}
        onSubmit={handleChangePassword}
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
