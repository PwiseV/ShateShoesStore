import React, { useState, useEffect } from "react";
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
  Divider,
  Stack,
  CircularProgress,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { usePayOS } from "@payos/payos-checkout";
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import { createPaymentLink } from "../../../services/paymentServices";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("payos");
  const [loading, setLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    // 1. Cấu hình PayOS
    const payOSConfig = {
      RETURN_URL: window.location.href,
      ELEMENT_ID: "embedded-payment-container",
      CHECKOUT_URL: checkoutUrl,
      embedded: true,
      onSuccess: (event: any) => {
        console.log("Thanh toán thành công:", event);
        window.location.href = "/orders?status=success";
      },
      onCancel: (event: any) => {
        console.log("Người dùng hủy thanh toán");
        setCheckoutUrl(null);
        setLoading(false);
      },
    };

    const { open, exit } = usePayOS(payOSConfig);
    console.log("Trạng thái PayOS Config:", payOSConfig);

    // 2. Tự động mở giao diện thanh toán khi nhận được URL từ Backend
    if (checkoutUrl) {
      open();
    }
  }, [checkoutUrl]);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPaymentMethod(value);
    if (value !== "payos") {
      exit();
      setCheckoutUrl(null);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      if (paymentMethod === "payos") {
        const orderPayload = {
          // 1. Tạo số ngẫu nhiên mới hoàn toàn để không trùng đơn cũ
          orderCode: Number(
            Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000),
          ),

          // 2. Số tiền tổng
          amount: 20000,

          // 3. Mô tả KHÔNG DẤU, KHÔNG KÝ TỰ ĐẶC BIỆT
          description: "Thanh toan don hang",

          // 4. Mảng items phải có tổng tiền khớp với amount ở trên
          items: [
            {
              name: "San pham mau",
              quantity: 1,
              price: 20000,
            },
          ],
          returnUrl: window.location.origin + "/payment-success",
          cancelUrl: window.location.origin + "/checkout",
        };

        const response = await createPaymentLink(orderPayload);

        if (response?.data?.checkoutUrl) {
          setCheckoutUrl(response.data.checkoutUrl);
        } else {
          alert("Lỗi: Không nhận được link thanh toán từ hệ thống.");
        }
      } else {
        // Logic cho COD
        alert("Đặt hàng thành công! Bạn sẽ thanh toán khi nhận hàng.");
        window.location.href = "/orders";
      }
    } catch (error: any) {
      console.error("Lỗi thanh toán:", error);
      alert(
        "Có lỗi xảy ra: " + (error.response?.data?.message || error.message),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box
        component="main"
        sx={{ bgcolor: "#F5EFE6", flexGrow: 1, py: { xs: 4, md: 8 } }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight={800}
            color="#2F4156"
            sx={{ mb: 1, fontFamily: "'Lexend', sans-serif" }}
          >
            Phương thức thanh toán
          </Typography>
          <Divider sx={{ borderColor: "#000", mb: 4, borderWidth: 1 }} />

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              bgcolor: "#D1E0E8",
              borderRadius: 4,
              minHeight: "450px",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 4, color: "#2C4A5C", fontWeight: 700 }}
            >
              Chọn hình thức thanh toán của bạn:
            </Typography>

            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
                {/* PAYOS OPTION */}
                <Paper
                  sx={{
                    p: 3,
                    mb: 2,
                    borderRadius: 3,
                    border:
                      paymentMethod === "payos"
                        ? "2px solid #2C4A5C"
                        : "1px solid #fff",
                    cursor: "pointer",
                  }}
                  onClick={() => setPaymentMethod("payos")}
                >
                  <FormControlLabel
                    value="payos"
                    control={
                      <Radio
                        sx={{
                          color: "#2C4A5C",
                          "&.Mui-checked": { color: "#2C4A5C" },
                        }}
                      />
                    }
                    label={
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <AccountBalanceIcon
                          sx={{ fontSize: 32, color: "#2C4A5C" }}
                        />
                        <Box>
                          <Typography
                            sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                          >
                            Chuyển khoản qua PayOS
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Hỗ trợ VietQR và tất cả ngân hàng.
                          </Typography>
                        </Box>
                      </Stack>
                    }
                    sx={{ width: "100%", m: 0 }}
                  />

                  {/* VÙNG HIỂN THỊ QR: Luôn có mặt trong DOM nhưng chỉ cao lên khi có URL */}
                  <Box
                    id="embedded-payment-container"
                    sx={{
                      mt: checkoutUrl ? 3 : 0,
                      height: checkoutUrl ? "600px" : "0px",
                      width: "100%",
                      borderRadius: 2,
                      overflow: "hidden",
                      bgcolor: "#fff",
                      transition: "all 0.5s ease-in-out",
                      border: checkoutUrl ? "1px dashed #2C4A5C" : "none",
                    }}
                  />
                </Paper>

                {/* COD OPTION */}
                <Paper
                  sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 3,
                    border:
                      paymentMethod === "cod"
                        ? "2px solid #2C4A5C"
                        : "1px solid #fff",
                    cursor: "pointer",
                  }}
                  onClick={() => setPaymentMethod("cod")}
                >
                  <FormControlLabel
                    value="cod"
                    control={
                      <Radio
                        sx={{
                          color: "#2C4A5C",
                          "&.Mui-checked": { color: "#2C4A5C" },
                        }}
                      />
                    }
                    label={
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <LocalShippingIcon
                          sx={{ fontSize: 32, color: "#2C4A5C" }}
                        />
                        <Box>
                          <Typography
                            sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                          >
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

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {!checkoutUrl && (
                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={handleCheckout}
                  sx={{
                    bgcolor: "#2C4A5C",
                    px: 8,
                    py: 2,
                    borderRadius: "50px",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    "&:hover": { bgcolor: "#1A2E3A" },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "XÁC NHẬN ĐẶT HÀNG"
                  )}
                </Button>
              )}
              {checkoutUrl && (
                <Button
                  variant="text"
                  onClick={() => {
                    setCheckoutUrl(null);
                    exit();
                  }}
                >
                  Chọn lại phương thức khác
                </Button>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default CheckoutPage;
