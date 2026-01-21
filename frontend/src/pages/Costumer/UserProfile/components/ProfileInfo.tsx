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

// Import các Modal
import UpdateProfileModal, { type ProfileData } from "./UpdateProfileModal";
import UpdateAddressModal, {
  type AddressFormState as UpdateAddressState,
} from "./UpdateAddressModal";
import AddAddressModal, { type AddressFormState } from "./AddAddressModal";

// Import useToast
import { useToast } from "../../../../context/useToast";

// [QUAN TRỌNG] Đã đổi sang import từ userProfileServices (Real API)
import {
  getUserProfile,
  updateUserProfile,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
} from "../../../../services/userProfileServices";

// Import Types
import type {
  UserProfile,
  Address,
} from "../../../../services/userProfileServices";

const ProfileInfo = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);

  // Khởi tạo state
  const [userData, setUserData] = useState<UserProfile>({
    username: "",
    name: "",
    email: "",
    phone: "",
    avatar: "",
    addresses: [],
  });

  const [addressList, setAddressList] = useState<Address[]>([]);

  // Modal States
  const [openModal, setOpenModal] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  // Selected Address State
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // --- 1. FETCH DATA KHI MOUNT ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();

        // Kiểm tra dữ liệu trả về có đúng format không
        if (data) {
          setUserData(data);
          setAddressList(data.addresses || []); // Fallback nếu addresses null
        }
      } catch (error) {
        showToast("Lỗi tải thông tin người dùng", "error");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showToast]);

  // --- 2. XỬ LÝ CẬP NHẬT PROFILE ---
  const handleUpdateProfile = async (newData: ProfileData) => {
    try {
      const updatedUser = await updateUserProfile({
        name: newData.name,
        phone: newData.phone,
        avatar: newData.avatar,
      });

      setUserData(updatedUser);
      showToast("Cập nhật thông tin thành công", "success");
      setOpenModal(false);
    } catch (error) {
      console.error(error);
      showToast("Cập nhật thất bại. Vui lòng thử lại.", "error");
    }
  };

  // --- 3. XỬ LÝ CÁC HÀM KHÁC (Giữ nguyên logic) ---
  const handleAddressClick = (addr: Address) => {
    setSelectedAddress(addr);
    setOpenAddressModal(true);
  };

  const handleAddNewAddress = async (newAddr: AddressFormState) => {
    try {
      const newAddressList = await addUserAddress({
        street: newAddr.street,
        ward: newAddr.ward,
        district: newAddr.district,
        city: newAddr.city,
        country: newAddr.country,
        isDefault: newAddr.isDefault,
      });

      // Cập nhật lại danh sách địa chỉ từ phản hồi của server (chính xác nhất)
      // Nếu server trả về 1 item mới -> setAddressList([...prev, newItem])
      // Nếu server trả về toàn bộ list -> setAddressList(newAddressList)
      // Code hiện tại giả định server trả về toàn bộ list (như trong fake service)
      if (Array.isArray(newAddressList)) {
        setAddressList(newAddressList);
      } else {
        // Trường hợp server chỉ trả về object mới thêm, bạn cần tự push vào mảng
        // Nhưng tốt nhất hãy để logic này khớp với backend của bạn
        // Ở đây tôi giữ nguyên logic nhận về mảng mới
        setAddressList(newAddressList as unknown as Address[]);
      }

      showToast("Thêm địa chỉ thành công", "success");
      setOpenAddModal(false);
    } catch (error) {
      console.error(error);
      showToast("Thêm địa chỉ thất bại", "error");
    }
  };

  const handleUpdateAddress = async (updatedData: UpdateAddressState) => {
    if (!selectedAddress) return;

    try {
      const newAddressList = await updateUserAddress(selectedAddress.id, {
        street: updatedData.street,
        ward: updatedData.ward,
        district: updatedData.district,
        city: updatedData.city,
        country: updatedData.country,
        isDefault: updatedData.isDefault,
      });

      setAddressList(newAddressList);
      showToast("Cập nhật địa chỉ thành công", "success");
      setOpenAddressModal(false);
    } catch (error) {
      console.error(error);
      showToast("Cập nhật địa chỉ thất bại", "error");
    }
  };

  const handleDeleteAddress = async () => {
    if (!selectedAddress) return;

    try {
      const newAddressList = await deleteUserAddress(selectedAddress.id);

      setAddressList(newAddressList);
      showToast("Xóa địa chỉ thành công", "success");
      setOpenAddressModal(false);
    } catch (error) {
      console.error(error);
      showToast("Xóa địa chỉ thất bại", "error");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          py: 10,
        }}
      >
        <CircularProgress sx={{ color: "#567C8D" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", pl: { md: 4 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            fontWeight: 800,
            color: "#2C3E50",
            mb: 0.5,
            fontFamily: '"Lexend", sans-serif',
          }}
        >
          Hồ sơ của tôi
        </Typography>
        <Typography
          sx={{
            textAlign: "left",
            color: "#567C8D",
            fontSize: "0.95rem",
            fontFamily: '"Lexend", sans-serif',
          }}
        >
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </Typography>
      </Box>

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
              <InfoRow label="Name" value={userData.name} />
              <InfoRow label="Email" value={userData.email} />
              <InfoRow label="Phone number" value={userData.phone} />
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            md={1}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Divider
              orientation="vertical"
              sx={{ height: "100%", borderColor: "#AAB7C4" }}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                src={userData.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  border: "4px solid white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              />
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: "#2C3E50",
                  fontFamily: '"Lexend", sans-serif',
                }}
              >
                {userData.username}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: "white",
                  mb: 3,
                  fontFamily: '"Lexend", sans-serif',
                }}
              >
                {userData.email}
              </Typography>

              <Button
                onClick={() => setOpenModal(true)}
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: "#2C3E50",
                  textTransform: "none",
                  borderRadius: "30px",
                  fontWeight: 600,
                  px: 3,
                  boxShadow: "none",
                  fontFamily: '"Lexend", sans-serif',
                  "&:hover": { bgcolor: "#f5f5f5", boxShadow: "none" },
                }}
              >
                Cập nhật hồ sơ
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ textAlign: "left", mb: 2 }}>
        <Typography
          sx={{
            color: "#567C8D",
            fontWeight: 600,
            fontSize: "1rem",
            fontFamily: '"Lexend", sans-serif',
          }}
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
          {addressList.map((addr) => (
            <Box
              key={addr.id}
              onClick={() => handleAddressClick(addr)}
              sx={{
                bgcolor: "white",
                borderRadius: "10px",
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#2C3E50",
                  fontFamily: '"Lexend", sans-serif',
                  fontSize: "0.9rem",
                }}
              >
                {addr.content}
              </Typography>
              {addr.isDefault && (
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#99AAB5",
                    fontWeight: 400,
                    fontStyle: "italic",
                    ml: 2,
                    fontFamily: '"Lexend", sans-serif',
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
              textTransform: "none",
              color: "#2C3E50",
              borderColor: "#2C3E50",
              fontWeight: 600,
              px: 4,
              py: 1,
              bgcolor: "white",
              fontFamily: '"Lexend", sans-serif',
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
          name: userData.name,
          phone: userData.phone,
          avatar: userData.avatar,
        }}
        onUpdate={handleUpdateProfile}
      />

      <UpdateAddressModal
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
        addressString={selectedAddress?.content || ""}
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
        fontSize: "1rem",
        fontFamily: '"Lexend", sans-serif',
        flexShrink: 0,
      }}
    >
      {label}:
    </Typography>
    <Typography
      sx={{
        color: "#567C8D",
        fontWeight: 500,
        fontSize: "1rem",
        fontFamily: '"Lexend", sans-serif',
        wordBreak: "break-word",
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default ProfileInfo;
