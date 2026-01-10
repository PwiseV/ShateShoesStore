// src/pages/Costumer/ProductList/components/Pagination/Pagination.tsx
import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";

const Pagination = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: 4,
        }}
      >
        <Button variant="text">‹</Button>
        <Button
          variant="contained"
          sx={{
            minWidth: 36,
            borderRadius: "50%",
            bgcolor: "#2C3E50",
          }}
        >
          1
        </Button>
        {[2, 3].map((n) => (
          <Button
            key={n}
            variant="text"
            sx={{ minWidth: 36, borderRadius: "50%" }}
          >
            {n}
          </Button>
        ))}
        <Typography sx={{ mx: 1 }}>…</Typography>
        {[9].map((n) => (
          <Button key={n} variant="text" sx={{ minWidth: 36 }}>
            {n}
          </Button>
        ))}
        <Button variant="text">›</Button>
      </Box>
      <Divider sx={{ mt: 4 }} />
    </>
  );
};

export default Pagination;
