import { Box, Typography, Container } from "@mui/material";

type Props = {
  title: string;
  author: string;
  date: string;
  image: string;
};

const BlogHero = ({ title, author, date, image }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "300px", md: "450px" }, // Responsive chiều cao
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        "&::before": {
          // Lớp phủ tối màu
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
        },
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{ fontWeight: 800, fontFamily: "Lexend", mb: 1 }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontFamily: "Lexend", opacity: 0.9 }}
        >
          {author} • {date}
        </Typography>
      </Container>
    </Box>
  );
};
export default BlogHero;
