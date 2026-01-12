import React from "react";
import { Grid } from "@mui/material";
// Import đúng type Product
import FavouriteCard, { type Product } from "./FavouriteCard";
import EmptyState from "../EmptyState";
import ProductSkeleton from "../Skeleton";

type Props = {
  products: Product[];
  loading?: boolean;
};

const FavouriteGrid = ({ products, loading }: Props) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, i) => (
          // Dùng prop 'size' giống code của bạn để tương thích Grid v2
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <Grid container spacing={3} rowSpacing={6}>
      {products.map((p) => (
        // size={{ ... md: 4 }} nghĩa là 3 hình trên 1 hàng (12/4 = 3)
        <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <FavouriteCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FavouriteGrid;
