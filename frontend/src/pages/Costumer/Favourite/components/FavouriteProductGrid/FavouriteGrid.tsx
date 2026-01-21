import React from "react";
import { Box } from "@mui/material";
import FavouriteCard, { type Product } from "./FavouriteCard";
import EmptyState from "../EmptyState";
import ProductSkeleton from "../Skeleton";

type Props = {
  products: Product[];
  loading?: boolean;
  onRemove?: (id: string) => void;
};

const FavouriteGrid = ({ products, loading, onRemove }: Props) => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "1fr 1fr",
      md: "repeat(3, 1fr)",
    },
    gap: 3,
    rowGap: 4,
  };

  if (loading) {
    return (
      <Box sx={gridStyle}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Box key={i}>
            <ProductSkeleton />
          </Box>
        ))}
      </Box>
    );
  }

  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box sx={gridStyle}>
      {products.map((p) => (
        <Box key={p.id}>
          <FavouriteCard product={p} onRemove={onRemove} />
        </Box>
      ))}
    </Box>
  );
};

export default FavouriteGrid;
