import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";

import { useAuth } from "../../context/useAuth";

interface SideBarProps {
  selectedMenu: string;
}

const sideBarItems = ["User", "Favourite", "History"];

const routes: Record<string, string> = {
  User: "/profile",
  Favourite: "/favourite",
  History: "/history",
};

const SideBar = ({ selectedMenu }: SideBarProps) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleButtonClick = (item: string) => () => {
    navigate(routes[item]); // 🔥 navigate đến route tương ứng
  };

  const handleSignOut = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <Box
      sx={{
        padding: "30px 20px",
        width: "100%", // Để Grid cha quản lý độ rộng (responsive hơn)
        height: "100%", // Full chiều cao
        minHeight: "100px", // Đảm bảo độ cao tối thiểu giống hình
        minWidth: "250px",
        backgroundColor: "#2C3E50",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Đẩy menu lên trên và signout xuống dưới
        boxShadow: "0 40px 50px rgba(0,0,0,0.1)",
        borderRadius: "20px",
      }}
    >
      {/* PHẦN MENU TRÊN */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {sideBarItems.map((item) => {
          const isActive = selectedMenu === item;
          return (
            <Button
              key={item}
              onClick={handleButtonClick(item)}
              disableRipple
              sx={{
                textTransform: "none",
                fontSize: "1.2rem",
                fontWeight: 700,
                justifyContent: "space-between", // Text trái, Mũi tên phải
                width: "100%",
                color: isActive ? "#F3C410" : "white", // Màu vàng khi active
                px: 1,
                fontFamily: '"Lexend", sans-serif',
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "#F3C410",
                },
              }}
            >
              {item}
              {/* Thêm mũi tên bên phải */}
              <NavigateNextSharpIcon
                sx={{
                  color: isActive ? "#F3C410" : "rgba(255,255,255,0.5)",
                }}
              />
            </Button>
          );
        })}
      </Box>

      {/* PHẦN NÚT SIGN OUT DƯỚI */}
      <Button
        onClick={handleSignOut}
        disableRipple
        sx={{
          textTransform: "none",
          fontSize: "1.2rem",
          fontWeight: 700,
          justifyContent: "space-between", // Căn đều 2 đầu
          width: "100%",
          color: "white",
          mt: 4,
          px: 1,
          fontFamily: '"DM Sans", sans-serif',
          "&:hover": {
            color: "#F3C410",
            bgcolor: "transparent",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Icon Exit quay ngược 180 độ để hướng ra ngoài */}
          <ExitToAppIcon sx={{ mr: 1 }} />
          Sign Out
        </Box>
        <NavigateNextSharpIcon />
      </Button>
    </Box>
  );
};

export default SideBar;
