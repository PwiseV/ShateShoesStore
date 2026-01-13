import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NavigateNextSharpIcon from '@mui/icons-material/NavigateNextSharp';

import { useAuth } from "../../context/useAuth";

interface SideBarProps {
  selectedMenu: string;
}

const sideBarItems = [
  "Tổng quan",
  "Quản lý người dùng",
  "Quản lý sản phẩm",
  "Quản lý đơn hàng",
  "Quản lý khuyến mãi",
  "Quản lý bài viết",
  "Quản lý đánh giá",
];

const routes: Record<string, string> = {
  "Tổng quan": "/admin/dashboard",
  "Quản lý người dùng": "/admin/users",
  "Quản lý sản phẩm": "/admin/products",
  "Quản lý đơn hàng": "/admin/orders",
  "Quản lý khuyến mãi": "/admin/promotions",
  "Quản lý bài viết": "/admin/posts",
  "Quản lý đánh giá": "/admin/reviews",
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
        padding: "20px",
        width: "260px",
        backgroundColor: "#2C3E50",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        borderRadius: "20px",
        gap: 2,
      }}
    >
      {sideBarItems.map((item) => (
        <Button
          key={item}
          onClick={handleButtonClick(item)}
          disableRipple
          sx={{
            textTransform: "none",
            fontSize: "1.2rem",
            fontWeight: 700,
            justifyContent: "flex-start",
            width: "100%",
            color: selectedMenu === item ? "#F3C410" : "white",
          }}
        >
          {item}
        </Button>
      ))}

      <Button
        onClick={handleSignOut}
        sx={{
          textTransform: "none",
          fontSize: "1.2rem",
          fontWeight: 700,
          justifyContent: "flex-start",
          width: "100%",
          color: "white",
          mt: "auto",
          px: 2,
        }}
      >
        <ExitToAppIcon sx={{ mr: 1 }} />
        Sign Out
        <NavigateNextSharpIcon sx={{ ml: "auto" }} />
      </Button>
    </Box>
  );
};

export default SideBar;
