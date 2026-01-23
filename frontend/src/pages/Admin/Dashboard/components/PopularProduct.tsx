import { useState, useEffect } from "react";
import { Paper, Typography, Avatar, Box, Button } from "@mui/material";
import StockStatus from "./StockStatus";
import { useToast } from "../../../../context/useToast";
import {
  type ProductItem,
  getDashboardPopularProducts,
} from "../../../../services/adminServices";

const PopularProduct = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const { showToast } = useToast();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getDashboardPopularProducts();
        setProducts(res);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
              ? err
              : "Something went wrong";
        showToast(message, "error");
      }
    };

    fetchProducts();
  });

  return (
    <Paper
      sx={{
        backgroundColor: "#F2F1FA",
        borderRadius: "20px",
        padding: "10px",
        pt: 4,
        width: "100%",
        // minWidth:"295px",
      }}
    >
      <Typography
        sx={{
          fontSize: "1rem",
          fontWeight: 700,
          mb: 1,
          ml: 2,
          textAlign: "left",
        }}
      >
        Popular Products
      </Typography>
      <Box sx={{}}>
        {products.slice(0, 4).map((c) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
              border: "1.5px solid #bbb",
              borderRadius: "5px",
              p: 1,
            }}
          >
            <Avatar alt={c.id} src={c.avatar} sx={{ width: 50, height: 50 }} />
            <Typography
              sx={{
                fontSize: "0.7rem",
                textAlign: "center",
                maxWidth: "90px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {c.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mr: 0,
                ml: "auto",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  textAlign: "right",
                }}
              >
                {c.price}
              </Typography>
              <StockStatus status={c.status}></StockStatus>
            </Box>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              border: "1.5px solid #bbb",
              textTransform: "none",
              fontSize: "0.9rem",
              color: "black",
              borderRadius: "20px",
              width: "100%",
            }}
          >
            All Products
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
export default PopularProduct;
