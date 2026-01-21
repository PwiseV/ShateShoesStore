import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import logoImg from "../../assets/logo3.svg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const menuItems = ["Giới thiệu", "Tin tức", "Danh mục", "abc"];

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
        <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {menuItems.map((item, index) => (
            <Typography
              key={index}
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "#567C8D",
                fontWeight: 500,
                fontSize: "1rem",
                "&:hover": { color: "#486172" },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* ICONS */}
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <IconButton component={Link} to="/cart" aria-label="Open cart" sx={{ color: "#627D98" }}>
            <ShoppingBagIcon fontSize="small"/>
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
