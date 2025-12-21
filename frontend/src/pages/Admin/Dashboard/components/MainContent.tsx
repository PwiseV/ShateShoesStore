import { Box, Grid } from "@mui/material";
import OverviewCard from "./OverviewCard";
import PopularProduct from "./PopularProduct";
import ProductView from "./ProductView";
import Comment from "./Comment";

const MainContent = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#C8D9E6",
        borderRadius: "20px",
        padding: "15px",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid size={8}>
          <OverviewCard />
        </Grid>
        <Grid size={4}>
          <PopularProduct />
        </Grid>
        <Grid size={6}>
          <ProductView />
        </Grid>
        <Grid size={6}>
          <Comment />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainContent;
