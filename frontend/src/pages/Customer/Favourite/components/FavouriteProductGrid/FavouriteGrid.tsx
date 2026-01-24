import React from "react";
import { Box } from "@mui/material";
import FavouriteCard from "./FavouriteCard";
import EmptyState from "../EmptyState";
import ProductSkeleton from "../Skeleton";
import { type FavouriteProduct } from "../../../../../services/favouriteServices"; //

type Props = {
  products: FavouriteProduct[];
  loading?: boolean;
  onRemove?: (id: string) => void;
};

const FavouriteGrid = ({ products, loading, onRemove }: Props) => {
  const gridStyle = {
    display: "grid",
    // [QUAN TRỌNG] Sử dụng minmax(0, 1fr) giúp cột tự co lại thay vì vỡ layout
    gridTemplateColumns: {
      xs: "1fr", // Mobile: 1 cột
      sm: "1fr 1fr", // Tablet nhỏ: 2 cột
      md: "repeat(3, minmax(0, 1fr))", // Laptop: ÉP BUỘC 3 cột đều nhau
      lg: "repeat(3, minmax(0, 1fr))", // PC: 3 cột
    },
    gap: { xs: 2, md: 2, lg: 3 }, // Khoảng cách: Nhỏ hơn ở laptop (2) để đỡ chật
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
        <Box key={p.favouriteId || p.productId}>
          <FavouriteCard product={p} onRemove={onRemove} />
        </Box>
      ))}
    </Box>
  );
};

export default FavouriteGrid;
