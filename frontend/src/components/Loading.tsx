import { Box, CircularProgress, Typography } from "@mui/material";

const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #e4ecf5 100%)",
        zIndex: 9999,
      }}
    >
      <CircularProgress size={48} thickness={4} />
      <Typography
        sx={{
          mt: 2,
          fontWeight: 600,
          color: "#2F4156",
          letterSpacing: "0.5px",
        }}
      >
        Chờ chút nhé!
      </Typography>
    </Box>
  );
};

export default FullScreenLoader;
