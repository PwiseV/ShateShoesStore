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

interface Props {
  open: boolean;
  onClose: () => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  paymentFilter: string;
  setPaymentFilter: (v: string) => void;
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
  const [tempStatus, setTempStatus] = useState<string>(statusFilter || "");
  const [tempPayment, setTempPayment] = useState<string>(paymentFilter || "");
  const [tempPrice, setTempPrice] = useState<[number, number]>(
    priceRange || [0, 50000000]
  );

  // Sync state when modal opens
  useEffect(() => {
    if (open) {
      setTempStatus(statusFilter);
      setTempPayment(paymentFilter);
      setTempPrice(priceRange);
    }
  }, [open, statusFilter, paymentFilter, priceRange]);

  const handleChange = (panel: string) => (_: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleApply = () => {
    setStatusFilter(tempStatus);
    setPaymentFilter(tempPayment);
    setPriceRange(tempPrice);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <DialogTitle>
          <Typography component="span" fontWeight={700}>
              Bộ lọc đơn hàng
          </Typography>
        </DialogTitle>
        <CloseIcon onClick={onClose} sx={{ cursor: "pointer" }} />
      </DialogTitle>

      <DialogContent dividers sx={{ p: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Trạng thái đơn hàng - Giữ nguyên */}
          <Accordion
            expanded={expanded === "status"}
            onChange={handleChange("status")}
            sx={{
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>
                Trạng thái đơn hàng
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup
                  value={tempStatus}
                  onChange={(e) => setTempStatus(e.target.value)}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio />}
                    label="Tất cả"
                  />
                  <FormControlLabel
                    value="waittingApproval"
                    control={<Radio />}
                    label="Chờ duyệt"
                  />
                  <FormControlLabel
                    value="processing"
                    control={<Radio />}
                    label="Đang xử lý"
                  />
                  <FormControlLabel
                    value="shipped"
                    control={<Radio />}
                    label="Đã gửi hàng"
                  />
                  <FormControlLabel
                    value="delivered"
                    control={<Radio />}
                    label="Đã giao"
                  />
                  <FormControlLabel
                    value="cancelled"
                    control={<Radio />}
                    label="Đã hủy"
                  />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* UPDATE: Phương thức thanh toán - Chỉ còn COD và Banking */}
          <Accordion
            expanded={expanded === "payment"}
            onChange={handleChange("payment")}
            sx={{
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>
                Phương thức thanh toán
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup
                  value={tempPayment}
                  onChange={(e) => setTempPayment(e.target.value)}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio />}
                    label="Tất cả"
                  />
                  <FormControlLabel
                    value="COD"
                    control={<Radio />}
                    label={paymentStatusConfig["COD"].label}
                  />
                  <FormControlLabel
                    value="Banking"
                    control={<Radio />}
                    label={paymentStatusConfig["Banking"].label}
                  />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          {/* Khoảng giá - Giữ nguyên */}
          <Accordion
            expanded={expanded === "price"}
            onChange={handleChange("price")}
            sx={{
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>Tổng tiền</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontSize: "13px", color: "#666", mb: 1 }}>
                {formatCurrency(tempPrice[0])} - {formatCurrency(tempPrice[1])}
              </Typography>
              <Slider
                value={tempPrice}
                onChange={(_e, newValue) =>
                  setTempPrice(newValue as [number, number])
                }
                min={0}
                max={50000000} // Tăng max lên xíu cho thoải mái
                step={100000}
                valueLabelDisplay="auto"
                sx={{
                  "& .MuiSlider-thumb": { backgroundColor: "#5c6ac4" },
                  "& .MuiSlider-track": { backgroundColor: "#5c6ac4" },
                }}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: "16px", gap: "12px" }}>
        <Button
          onClick={() => {
            setTempStatus("");
            setTempPayment("");
            setTempPrice([0, 5000000]);
            onClear();
          }}
          variant="outlined"
          sx={{ textTransform: "none", color: "#666", borderColor: "#ddd" }}
        >
          Xóa bộ lọc
        </Button>
        <Button
          onClick={handleApply}
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#5c6ac4",
            "&:hover": { backgroundColor: "#4a5aa8" },
          }}
        >
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FiltersModal;
