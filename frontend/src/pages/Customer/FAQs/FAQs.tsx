import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";

// Import Layout
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";

// Import Components
import FAQItem from "./components/FAQItem";

// --- DỮ LIỆU CỨNG (HARDCODED CONTENT) ---
const FAQ_DATA = [
  {
    id: "panel1",
    question: "Làm thế nào để tôi chọn đúng kích cỡ giày?",
    answer:
      "Bạn có thể tham khảo bảng hướng dẫn chọn size của chúng tôi ngay dưới mỗi sản phẩm. Nếu bạn vẫn phân vân, hãy đo chiều dài bàn chân theo hướng dẫn và so sánh với bảng size chuẩn - hoặc liên hệ với chúng tôi, đội ngũ tư vấn sẽ giúp bạn chọn kích cỡ phù hợp nhất.",
  },
  {
    id: "panel2",
    question: "Tôi có thể đổi hoặc trả sản phẩm không?",
    answer:
      "Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày kể từ khi nhận hàng nếu sản phẩm còn nguyên tem mác, chưa qua sử dụng và có lỗi từ nhà sản xuất hoặc do giao sai mẫu. Vui lòng quay video khi mở hàng để được hỗ trợ nhanh nhất.",
  },
  {
    id: "panel3",
    question: "Thời gian giao hàng mất bao lâu?",
    answer:
      "Thời gian giao hàng thường mất từ 2-4 ngày làm việc đối với khu vực nội thành và 3-5 ngày đối với các tỉnh thành khác. Trong các dịp lễ tết hoặc khuyến mãi lớn, thời gian có thể chênh lệch 1-2 ngày.",
  },
  {
    id: "panel4",
    question: "Tôi có thể thanh toán bằng hình thức nào?",
    answer:
      "Chúng tôi hỗ trợ nhiều hình thức thanh toán linh hoạt bao gồm: Thanh toán khi nhận hàng (COD), Chuyển khoản ngân hàng, và Thanh toán qua ví điện tử (Momo, VNPay).",
  },
];

const FAQs = () => {
  // State để quản lý Accordion nào đang mở
  // Mặc định mở cái đầu tiên ('panel1'), nếu muốn đóng hết thì để false hoặc string rỗng
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // Scroll lên đầu trang khi load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#F5EFEB", // Màu nền be giống các trang khác
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ flex: 1, py: 8 }}>
        {/* --- TIÊU ĐỀ --- */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#2C3E50",
              fontFamily: '"Lexend", sans-serif',
              mb: 2,
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#567C8D",
              fontFamily: '"Lexend", sans-serif',
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Chúng tôi luôn sẵn lòng hỗ trợ bạn. Dưới đây là những câu hỏi phổ
            biến mà khách hàng thường quan tâm khi mua sắm giày cùng chúng tôi.
          </Typography>
        </Box>

        {/* --- DANH SÁCH CÂU HỎI --- */}
        <Box>
          {FAQ_DATA.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              expanded={expanded === faq.id}
              onChange={handleChange(faq.id)}
            />
          ))}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default FAQs;
