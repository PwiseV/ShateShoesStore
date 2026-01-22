import React, { useState, useEffect, useCallback } from "react";
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
  Divider
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { usePayOS } from "@payos/payos-checkout";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import { createPaymentLink } from "../../../services/paymentServices";
import { useToast } from "../../../context/useToast";
import { createOrder } from "../../../services/checkoutService";
import type { CreateOrderPayload } from "../Checkout/types";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const orderState = location.state as {
    shippingFee: number;
    total: number;
    name: string;
    phone: string;
    address: string;
    note: string;
    paymentMethod: string;
    promotionId: string;
    items: any[];
  } | null;

  const [paymentMethod, setPaymentMethod] = useState("payos");
  const [loading, setLoading] = useState(false); // Loading khi tạo link PayOS
  const [isProcessingOrder, setIsProcessingOrder] = useState(false); // Loading khi đang tạo đơn hàng vào DB
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  // --- HÀM TẠO ĐƠN HÀNG DÙNG CHUNG ---
  const handleFinalizeOrder = useCallback(
    async (method: "COD" | "Banking") => {
      if (!orderState) return;

      setIsProcessingOrder(true);
      try {
        const payload: CreateOrderPayload = {
          shippingFee: orderState.shippingFee,
          total: orderState.total,
          name: orderState.name,
          phone: orderState.phone,
          address: orderState.address,
          note: orderState.note,
          paymentMethod: method,
          promotionId: orderState.promotionId,
          items: orderState.items.map((item) => ({
            cartItemId: item.cartItemId,
            variantId: item.variantId,
            quantity: item.quantity,
          })),
          // status: method === "Banking" ? "paid" : "pending" // Tùy logic BE của bạn
        };

        await createOrder(payload);
        navigate("/order-success");
      } catch (error: any) {
        console.error("Lỗi tạo đơn hàng:", error);
        showToast(
          error.response?.data?.message || "Lỗi khi lưu đơn hàng vào hệ thống",
          "error",
        );
      } finally {
        setIsProcessingOrder(false);
      }
    },
    [orderState, navigate, showToast],
  );

  // --- CẤU HÌNH PAYOS ---
  const payOSConfig = {
    RETURN_URL: window.location.origin + "/order-success",
    ELEMENT_ID: "embedded-payment-container",
    CHECKOUT_URL: checkoutUrl || "",
    embedded: true,
    onSuccess: async (event: any) => {
      console.log("PayOS Success:", event);
      await handleFinalizeOrder("Banking");
    },
    onCancel: (event: any) => {
      setCheckoutUrl(null);
      showToast("Bạn đã hủy thanh toán", "info");
    },
  };

  const { open, exit } = usePayOS(payOSConfig);

  useEffect(() => {
    if (checkoutUrl) open();
  }, [checkoutUrl, open]);

  useEffect(() => {
    if (!orderState) {
      showToast("Không tìm thấy thông tin đơn hàng", "error");
      navigate("/");
    }
  }, [orderState, navigate, showToast]);

  const handlePaymentClick = async () => {
    if (!orderState) return;

    if (paymentMethod === "cod") {
      await handleFinalizeOrder("COD");
    } else {
      setLoading(true);
      try {
        const payload = {
          amount: orderState.total,
          description: `Thanh toan don hang`,
          items: orderState.items.map((i) => ({
            name: i.product?.title || "Sản phẩm",
            quantity: i.quantity,
            price: i.price,
          })),
        };
        const res = await createPaymentLink(payload);
        if (res?.data?.checkoutUrl) {
          setCheckoutUrl(res.data.checkoutUrl);
        }
      } catch (error) {
        showToast("Lỗi khởi tạo cổng thanh toán", "error");
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
            sx={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Thanh toán đơn hàng
          </Typography>
        <Divider sx={{ borderColor: "#000000", mt: 2, mb: 4 }} />
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ mb: 3, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
            <Typography variant="h5" color="#d32f2f" fontWeight={700}>
              Tổng tiền: {orderState.total.toLocaleString("vi-VN")}đ
            </Typography>
          </Box>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setCheckoutUrl(null);
                exit();
              }}
            >
              {/* Option PayOS */}
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

                {paymentMethod === "payos" && checkoutUrl && (
                  <Box
                    sx={{ p: 1, bgcolor: "#fff", borderTop: "1px solid #eee" }}
                  >
                    <div
                      id="embedded-payment-container"
                      style={{ height: "350px", width: "100%" }}
                    ></div>
                  </Box>
                )}
              </Paper>

              {/* Option COD */}
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

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            {!checkoutUrl ? (
              <Button
                variant="contained"
                disabled={loading || isProcessingOrder}
                onClick={handlePaymentClick}
                sx={{
                  bgcolor: "#2C4A5C",
                  px: 6,
                  py: 1.5,
                  borderRadius: "50px",
                  fontWeight: 800,
                  "&:hover": { bgcolor: "#1A2E3A" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  `XÁC NHẬN THANH TOÁN`
                )}
              </Button>
            ) : (
              <Button
                color="error"
                onClick={() => {
                  setCheckoutUrl(null);
                  exit();
                }}
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
