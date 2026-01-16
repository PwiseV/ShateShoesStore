import { Box, Grid, Paper, Typography } from "@mui/material";
import Img from "../../../../assets/StatSection.jpg";

const StatsSection = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 5,
        margin: "0 2rem",
        maxWidth: "1200px",
        mx: "0 auto",
      }}
    >
      <Grid
        container
        spacing={2}
        wrap="nowrap"
        alignItems="stretch"
      >
        {/* ITEM 1 */}
        <Grid>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              p: 4,
              height: "100%",
              minHeight: 300,
              background: "linear-gradient(135deg, #4A7C9E 0%, #3A6C8E 100%)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, mb: 2, fontSize: "2rem", textAlign: "left" }}
            >
              Who We Are
            </Typography>

            <Typography sx={{ lineHeight: 1.8, color: "rgba(255,255,255,0.9)", textAlign:"left" }}>
              Bởi mỗi bước chân đều xứng đáng được nâng niu — chúng tôi tạo nên
              những đôi giày kết hợp giữa thành tích, thoải mái và phong cách.
            </Typography>
          </Paper>
        </Grid>

        {/* ITEM 2 */}
        <Grid>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              height: "100%",
              backgroundColor: "#E8E4DC",
              display: "flex",
            }}
          >
            <Box
              component="img"
              src={Img}
              alt="Sneakers"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatsSection;
