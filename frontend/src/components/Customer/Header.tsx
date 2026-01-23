import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import logoImg from "../../assets/logo3.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const menuItems = [
  { label: "Trang chủ", path: "/homepage" },
  { label: "Sản phẩm", path: "/products" },
  { label: "Giới thiệu", path: "/about-us" },
  { label: "Liên hệ", path: "/contact-us" },
];

const Header: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "white",
        top: "1rem",
        borderRadius: "25px",
        width: "900px",
        maxWidth: "1200px",
        mx: "auto",
        border: "1.5px solid #567C8D",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* LOGO + TEXT */}
        <Box
          component={Link}
          to="/homepage"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
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
              alignItems: "center",
              marginTop: "3px",
            }}
          >
            SHATE
          </Typography>
        </Box>

        {/* MENU */}
        <Box sx={{ display: "flex", gap: "4rem", alignItems: "center" }}>
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
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              >
                {item.label}
              </Typography>

              {/* Chỉ hiển thị icon nếu item là "Danh mục" -> "Sản phẩm" có thể cần hoặc không, tạm bỏ logic icon hoặc giữ cho Sản phẩm */}
              {item.label === "Sản phẩm" && (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </Box>
          ))}
        </Box>

        {/* ICONS */}
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <IconButton component={Link} to="/cart" aria-label="Open cart" sx={{ color: "#627D98" }}>
            <ShoppingBagIcon fontSize="small" />
          </IconButton>

          <IconButton
            component={Link}
            to="/signin"
            aria-label="Sign in"
            sx={{ color: "#567C8D" }}
          >
            <AccountCircleIcon fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
