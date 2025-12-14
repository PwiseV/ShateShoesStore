import { Box, Grid, Paper } from "@mui/material";
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
        <Grid item xs={8}>
          <OverviewCard />
        </Grid>
        <Grid item xs={4}>
          <PopularProduct />
        </Grid>
        <Grid item xs={4}>
          <ProductView />
        </Grid>
        <Grid item xs={8}>
          <Comment />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainContent;
