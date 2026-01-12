import React from "react";
import { Box, Button, Typography } from "@mui/material";

const Pagination = () => {
  const btnStyle = {
    minWidth: "36px",
    height: "36px",
    borderRadius: "50%",
    p: 0,
    fontSize: "0.9rem",
    fontWeight: 500,
    fontFamily: '"Lexend", sans-serif',
    color: "#2C3E50",
    "&:hover": { bgcolor: "#e0e0e0" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        mt: 8,
      }}
    >
      <Button variant="text" sx={{ ...btnStyle, fontSize: "1.2rem" }}>
        ‹
      </Button>

      <Button
        variant="contained"
        sx={{
          ...btnStyle,
          bgcolor: "#567C8D",
          color: "white",
          "&:hover": { bgcolor: "#456372" },
        }}
      >
        1
      </Button>

      {[2, 3].map((n) => (
        <Button key={n} variant="text" sx={btnStyle}>
          {n}
        </Button>
      ))}

      <Typography sx={{ mx: 0.5, color: "#2C3E50" }}>. . .</Typography>

      <Button variant="text" sx={btnStyle}>
        9
      </Button>

      <Button variant="text" sx={{ ...btnStyle, fontSize: "1.2rem" }}>
        ›
      </Button>
    </Box>
  );
};

export default Pagination;
