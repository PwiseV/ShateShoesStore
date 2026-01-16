import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import type { Product } from "./ProductCard";
import EmptyState from "./EmptyState";
import ProductSkeleton from "./ProductSkeleton";

type Props = {
  products: Product[];
  loading?: boolean;
};

const ProductGrid = ({ products, loading }: Props) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, i) => (
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
    <Grid container spacing={3}>
      {products.map((p) => (
        <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
