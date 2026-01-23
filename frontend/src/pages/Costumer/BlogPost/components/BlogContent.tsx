import { Box, Container } from "@mui/material";

const BlogContent = ({ content }: { content: string }) => {
  return (
    <Box sx={{ bgcolor: "#F5EFEB", py: 6 }}>
      {" "}
      {/* Màu nền kem giống ảnh */}
      <Container maxWidth="md">
        {" "}
        {/* Giới hạn chiều rộng đọc cho dễ */}
        <Box
          sx={{
            color: "#333",
            fontFamily: "Lexend, sans-serif",
            lineHeight: 1.8,
            fontSize: "1.1rem",
            textAlign: "justify", // Căn đều 2 bên như trong báo
            "& h3": { fontWeight: 700, mt: 3, mb: 1, fontSize: "1.3rem" }, // Style cho heading
            "& ul": { pl: 3, mb: 2 }, // Style cho list
            "& li": { mb: 1 },
            "& a": { textDecoration: "underline", fontWeight: 600 }, // Link Shondo
          }}
          // Render HTML từ backend
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    </Box>
  );
};
export default BlogContent;
