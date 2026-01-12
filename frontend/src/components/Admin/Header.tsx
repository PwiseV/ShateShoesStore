import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import logoImg from "../../assets/logo3.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const menuItems = ["Giới thiệu", "Tin tức", "Danh mục", "Liên hệ"];

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

        {/* ICONS */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
