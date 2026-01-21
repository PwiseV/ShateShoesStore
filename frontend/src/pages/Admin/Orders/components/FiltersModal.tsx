import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatCurrency } from "../utils";
import { paymentStatusConfig } from "../constants";
import type { OrderStatus, PaymentMethod } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;

  statusFilter?: OrderStatus;
  setStatusFilter: (v?: OrderStatus) => void;

  paymentFilter?: PaymentMethod;
  setPaymentFilter: (v?: PaymentMethod) => void;

  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;

  onClear: () => void;
}

const FiltersModal: React.FC<Props> = ({
  open,
  onClose,
  statusFilter,
  setStatusFilter,
  paymentFilter,
  setPaymentFilter,
  priceRange,
  setPriceRange,
  onClear,
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  // UI state (cho phép "")
  const [tempStatus, setTempStatus] = useState<OrderStatus | "">("");
  const [tempPayment, setTempPayment] = useState<PaymentMethod | "">("");
  const [tempPrice, setTempPrice] = useState<[number, number]>(priceRange);

  useEffect(() => {
    if (open) {
      setTempStatus(statusFilter ?? "");
      setTempPayment(paymentFilter ?? "");
      setTempPrice(priceRange);
    }
  }, [open, statusFilter, paymentFilter, priceRange]);

  const handleApply = () => {
    setStatusFilter(tempStatus || undefined);
    setPaymentFilter(tempPayment || undefined);
    setPriceRange(tempPrice);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography fontWeight={700}>Bộ lọc đơn hàng</Typography>
        <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* STATUS */}
          <Accordion expanded={expanded === "status"} onChange={(_, e) => setExpanded(e ? "status" : false)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Trạng thái đơn hàng</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup value={tempStatus} onChange={(e) => setTempStatus(e.target.value as any)}>
                <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                <FormControlLabel value="pending" control={<Radio />} label="Chờ duyệt" />
                <FormControlLabel value="processing" control={<Radio />} label="Đang xử lý" />
                <FormControlLabel value="shipped" control={<Radio />} label="Đã gửi hàng" />
                <FormControlLabel value="delivered" control={<Radio />} label="Đã giao" />
                <FormControlLabel value="cancelled" control={<Radio />} label="Đã hủy" />
              </RadioGroup>
            </AccordionDetails>
          </Accordion>

          {/* PAYMENT */}
          <Accordion expanded={expanded === "payment"} onChange={(_, e) => setExpanded(e ? "payment" : false)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Phương thức thanh toán</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup value={tempPayment} onChange={(e) => setTempPayment(e.target.value as any)}>
                <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                <FormControlLabel value="COD" control={<Radio />} label={paymentStatusConfig.COD.label} />
                <FormControlLabel value="Banking" control={<Radio />} label={paymentStatusConfig.Banking.label} />
              </RadioGroup>
            </AccordionDetails>
          </Accordion>

          {/* PRICE */}
          <Accordion expanded={expanded === "price"} onChange={(_, e) => setExpanded(e ? "price" : false)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>Tổng tiền</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontSize={13} mb={1}>
                {formatCurrency(tempPrice[0])} – {formatCurrency(tempPrice[1])}
              </Typography>
              <Slider
                value={tempPrice}
                onChange={(_, v) => setTempPrice(v as [number, number])}
                min={0}
                max={50_000_000}
                step={100_000}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            setTempStatus("");
            setTempPayment("");
            setTempPrice([0, 50_000_000]);
            onClear();
          }}
        >
          Xóa bộ lọc
        </Button>
        <Button variant="contained" onClick={handleApply}>
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FiltersModal;
