// src/pages/Customer/Payment/Payment.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

// Import Icon
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

// Import PayOS
import { usePayOS } from "@payos/payos-checkout";

// Import Components & Services
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import { createPaymentLink } from "../../../services/paymentServices";
import { useToast } from "../../../context/useToast";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Lấy dữ liệu đơn hàng từ trang Checkout
  const orderState = location.state as {
    orderId: string;
    orderCode: number;
    total: number;
    items: any[];
  } | null;

  const [paymentMethod, setPaymentMethod] = useState("payos");
  const [loading, setLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  // --- 1. CẤU HÌNH PAYOS ---
  const payOSConfig = {
    RETURN_URL: window.location.origin + "/order-success", // Trang đích sau khi thanh toán xong
    ELEMENT_ID: "embedded-payment-container", // ID của thẻ div chứa iframe
    CHECKOUT_URL: checkoutUrl || "", // Fallback chuỗi rỗng để tránh lỗi TypeScript
    embedded: true, // Chế độ nhúng iframe
    onSuccess: (event: any) => {
      console.log("Thanh toán thành công:", event);
      navigate("/order-success");
    },
    onCancel: (event: any) => {
      console.log("Hủy thanh toán:", event);
      setCheckoutUrl(null);
    },
  };

  const { open, exit } = usePayOS(payOSConfig);

  // --- 2. QUAN TRỌNG: Trigger mở iframe khi có link ---
  useEffect(() => {
    if (checkoutUrl) {
      open();
    }
  }, [checkoutUrl, open]);

  // Kiểm tra dữ liệu đầu vào
  useEffect(() => {
    if (!orderState) {
      showToast("Không tìm thấy thông tin đơn hàng", "error");
      navigate("/");
    }
  }, [orderState, navigate, showToast]);

  // Xử lý tạo link thanh toán
  const handlePayment = async () => {
    if (!orderState) return;

    // Trường hợp COD
    if (paymentMethod === "cod") {
      showToast("Đặt hàng thành công! (Thanh toán khi nhận hàng)", "success");
      navigate("/order-success");
      return;
    }

    // Trường hợp PayOS
    if (paymentMethod === "payos") {
      setLoading(true);
      try {
        const payload = {
          amount: orderState.total,
          description: `Thanh toan don ${orderState.orderCode}`,
          items: orderState.items.map((i) => ({
            name: i.product?.title || "Sản phẩm",
            quantity: i.quantity,
            price: i.price,
          })),
        };

        const res = await createPaymentLink(payload);

        if (res && res.data && res.data.checkoutUrl) {
          setCheckoutUrl(res.data.checkoutUrl);
        } else {
          showToast("Không tạo được link thanh toán", "error");
        }
      } catch (error: any) {
        console.error(error);
        showToast("Lỗi khởi tạo thanh toán", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!orderState) return null;

  return (
    <Box sx={{ bgcolor: "#f6f1ec", minHeight: "100vh" }}>
      <Header />
      <Container sx={{ py: 4, maxWidth: "800px !important" }}>
        <Typography
          variant="h4"
          fontWeight={800}
          color="#2F4156"
          mb={3}
          textAlign="center"
        >
          Thanh toán đơn hàng
        </Typography>

        <Paper sx={{ p: 4, borderRadius: 3 }}>
          {/* Thông tin đơn hàng */}
          <Box sx={{ mb: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
            <Typography variant="h6" color="#2F4156">
              Mã đơn hàng: <b>#{orderState.orderCode}</b>
            </Typography>
            <Typography variant="h5" color="#d32f2f" fontWeight={700} mt={1}>
              Tổng tiền: {orderState.total.toLocaleString("vi-VN")}đ
            </Typography>
          </Box>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setCheckoutUrl(null); // Reset nếu đổi phương thức
                // exit(); // Có thể bỏ comment nếu muốn tắt hẳn iframe cũ
              }}
            >
              {/* --- OPTION 1: PAYOS --- */}
              <Paper
                elevation={0}
                sx={{
                  border:
                    paymentMethod === "payos"
                      ? "2px solid #2C4A5C"
                      : "1px solid #e0e0e0",
                  borderRadius: 2,
                  mb: 2,
                  overflow: "hidden",
                }}
              >
                <FormControlLabel
                  value="payos"
                  control={<Radio sx={{ ml: 2 }} />}
                  label={
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      py={2}
                      width="100%"
                    >
                      <AccountBalanceIcon color="primary" fontSize="large" />
                      <Box>
                        <Typography fontWeight={700}>
                          Chuyển khoản QR (PayOS)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quét mã QR ngân hàng, xác nhận tự động.
                        </Typography>
                      </Box>
                    </Stack>
                  }
                  sx={{ width: "100%", m: 0 }}
                />

                {/* --- KHU VỰC HIỂN THỊ IFRAME (ĐÃ FIX) --- */}
                {/* Chỉ render khu vực này khi chọn PayOS */}
                {paymentMethod === "payos" && (
                  <Box
                    sx={{
                      // Logic hiển thị:
                      // Nếu có checkoutUrl -> display: block
                      // Nếu chưa có -> display: none (nhưng thẻ DIV vẫn tồn tại trong DOM)
                      display: checkoutUrl ? "block" : "none",

                      mt: 2,
                      p: 1,
                      bgcolor: "#fff",
                      borderTop: "1px solid #eee",

                      // Hiệu ứng mở mượt mà
                      transition: "all 0.3s ease",

                      // Viền tạm thời để debug: Giúp bạn thấy khung kể cả khi iframe trắng
                      border: "1px dashed #2C4A5C",
                    }}
                  >
                    {/* Thẻ DIV này là nơi PayOS nhúng iframe vào */}
                    <div
                      id="embedded-payment-container"
                      style={{
                        height: "350px", // Chiều cao cố định bắt buộc
                        width: "100%",
                      }}
                    ></div>
                  </Box>
                )}
                {/* ----------------------------------------- */}
              </Paper>

              {/* --- OPTION 2: COD --- */}
              <Paper
                elevation={0}
                sx={{
                  border:
                    paymentMethod === "cod"
                      ? "2px solid #2C4A5C"
                      : "1px solid #e0e0e0",
                  borderRadius: 2,
                }}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio sx={{ ml: 2 }} />}
                  label={
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      py={2}
                    >
                      <LocalShippingIcon color="action" fontSize="large" />
                      <Box>
                        <Typography fontWeight={700}>
                          Thanh toán khi nhận hàng (COD)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Thanh toán bằng tiền mặt khi shipper giao tới.
                        </Typography>
                      </Box>
                    </Stack>
                  }
                  sx={{ width: "100%", m: 0 }}
                />
              </Paper>
            </RadioGroup>
          </FormControl>

          {/* --- NÚT BẤM HÀNH ĐỘNG --- */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            {/* Trường hợp 1: Chưa có link thanh toán -> Hiện nút "THANH TOÁN" */}
            {!checkoutUrl && (
              <Button
                variant="contained"
                disabled={loading}
                onClick={handlePayment}
                sx={{
                  bgcolor: "#2C4A5C",
                  px: 6,
                  py: 1.5,
                  borderRadius: "50px",
                  fontWeight: 800,
                  fontSize: "1rem",
                  "&:hover": { bgcolor: "#1A2E3A" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  `THANH TOÁN ${orderState.total.toLocaleString("vi-VN")}đ`
                )}
              </Button>
            )}

            {/* Trường hợp 2: Đã có link -> Hiện nút "HỦY/CHỌN LẠI" */}
            {checkoutUrl && (
              <Button
                color="error"
                onClick={() => {
                  setCheckoutUrl(null);
                  exit();
                }}
                sx={{ mt: 2 }}
              >
                Chọn phương thức khác
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default PaymentPage;
