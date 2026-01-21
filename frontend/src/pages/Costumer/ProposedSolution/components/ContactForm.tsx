import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useToast } from "../../../../context/useToast";

// import { submitSolution } from "../../../../services/fakeSolutionServices";
import { submitSolution } from "../../../../services/solutionServices";
import type { SolutionDTO } from "../../../../services/solutionServices";

const ContactForm = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  // [MỚI] Đổi tên state cho đúng ngữ nghĩa (dù cấu trúc không đổi)
  const [formData, setFormData] = useState<SolutionDTO>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, phone, email, message } = formData;

    if (!firstName || !lastName || !phone || !email || !message) {
      showToast("Vui lòng điền đầy đủ thông tin!", "warning");
      return;
    }

    setLoading(true);

    try {
      // [MỚI] Gọi hàm submitSolution thay vì sendContact
      await submitSolution(formData);

      showToast("Gửi đề xuất thành công!", "success");

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      showToast("Lỗi hệ thống, vui lòng thử lại sau!", "error");
    } finally {
      setLoading(false);
    }
  };

  // ... (Phần Styles và Return giữ nguyên y hệt code trước)
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "50px",
      bgcolor: "white",
      boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
      "& fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "none" },
    },
    "& input": {
      pl: 3,
      py: 1.8,
      fontFamily: '"Lexend", sans-serif',
      fontSize: "1rem",
      color: "#2C3E50",
    },
  };

  const textAreaStyle = {
    ...inputStyle,
    "& .MuiOutlinedInput-root": {
      ...inputStyle["& .MuiOutlinedInput-root"],
      borderRadius: "24px",
      padding: "16px",
    },
    "& textarea": {
      fontFamily: '"Lexend", sans-serif',
      fontSize: "1rem",
      color: "#2C3E50",
    },
  };

  const labelStyle = {
    mb: 1,
    fontWeight: 700,
    color: "#6D8A96",
    fontFamily: '"Lexend", sans-serif',
    fontSize: "0.95rem",
    textAlign: "left",
  };

  return (
    <Box
      sx={{
        bgcolor: "#D8E2EB",
        p: { xs: 4, md: 5 },
        borderRadius: "30px",
        height: "100%",
        boxShadow: "0 10px 30px rgba(44, 62, 80, 0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <Box sx={{ width: "50%" }}>
            <Typography sx={labelStyle}>Tên</Typography>
            <TextField
              fullWidth
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Huong"
              variant="outlined"
              sx={inputStyle}
              disabled={loading}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography sx={labelStyle}>Họ</Typography>
            <TextField
              fullWidth
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Nguyen"
              variant="outlined"
              sx={inputStyle}
              disabled={loading}
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Box sx={{ width: "50%" }}>
            <Typography sx={labelStyle}>Số điện thoại</Typography>
            <TextField
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456 - 789"
              variant="outlined"
              sx={inputStyle}
              disabled={loading}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography sx={labelStyle}>Email</Typography>
            <TextField
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              variant="outlined"
              sx={inputStyle}
              disabled={loading}
            />
          </Box>
        </Stack>

        <Box>
          <Typography sx={labelStyle}>
            Hãy để lại lời nhắn cho chúng tôi
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Hãy viết lời nhắn gửi ở đây..."
            variant="outlined"
            sx={textAreaStyle}
            disabled={loading}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: "#567C8D",
              color: "white",
              borderRadius: "50px",
              px: 6,
              py: 1.5,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 700,
              fontFamily: '"Lexend", sans-serif',
              boxShadow: "0 4px 15px rgba(86, 124, 141, 0.3)",
              "&:hover": {
                bgcolor: "#456372",
                boxShadow: "0 6px 20px rgba(86, 124, 141, 0.4)",
              },
              "&:disabled": { bgcolor: "#9AB0B9", color: "white" },
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ color: "white", mr: 1 }} />{" "}
                Đang gửi...
              </>
            ) : (
              "Gửi"
            )}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ContactForm;
