import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import logoImg from "../../assets/logo3.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Import useAuth từ context của bạn
import { useAuth } from "../../context/useAuth"; 

const menuItems = [
  { label: "Sản phẩm", path: "/products" },
  { label: "Giới thiệu", path: "/about-us" },
  { label: "Tin tức", path: "/blog" },
  { label: "FAQ", path: "/faqs" },
  { label: "Liên hệ", path: "/contact-us" },
];

const Header: React.FC = () => {
  // Lấy user và trạng thái loading từ useAuth
  const { user, loading } = useAuth();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "white",
        top: "1rem",
        borderRadius: "25px",
        width: "95%", // Tăng chiều rộng một chút để tránh bị chật khi có nút
        maxWidth: "900px",
        mx: "auto",
        border: "1.5px solid #567C8D",
        backgroundColor: "#FFFFFF",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
        {/* LOGO + TEXT */}
        <Box
          component={Link}
          to="/homepage"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            textDecoration: "none",
          }}
        >
          <Box
            component="img"
            src={logoImg}
            alt="SHATE logo"
            sx={{ height: 40, width: "auto" }}
          />
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "8px",
              color: "#567C8D",
              marginTop: "3px",
            }}
          >
            SHATE
          </Typography>
        </Box>

        {/* MENU */}
        <Box sx={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {menuItems.map((item, index) => (
            <Box
              key={index}
              component={Link}
              to={item.path}
              sx={{
                textDecoration: "none",
                color: "#567C8D",
                display: "flex",
                alignItems: "center",
                gap: "2px",
                cursor: "pointer",
                "&:hover": { color: "#486172" },
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: "1rem" }}>
                {item.label}
              </Typography>
              {item.label === "Sản phẩm" && (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </Box>
          ))}
        </Box>

        {/* ICONS / AUTH BUTTONS */}
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {loading ? (
            // Hiển thị khoảng trống hoặc loading nhẹ khi đang check auth
            <Box sx={{ width: 100 }} />
          ) : user ? (
            /* KHI ĐÃ ĐĂNG NHẬP */
            <>
              <IconButton component={Link} to="/cart" sx={{ color: "#627D98" }}>
                <ShoppingBagIcon fontSize="small" />
              </IconButton>
              <IconButton component={Link} to="/profile" sx={{ color: "#567C8D" }}>
                <AccountCircleIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            /* KHI CHƯA ĐĂNG NHẬP */
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#567C8D",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                Đăng nhập
              </Button>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 0.5, my: 1.5, borderColor: "#567C8D" }}
              />
              <Button
                component={Link}
                to="/register"
                sx={{
                  color: "#567C8D",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                Đăng ký
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;