import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Slider, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatCurrency } from "../utils";

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

const FiltersModal: React.FC<Props> = ({ open, onClose, statusFilter, setStatusFilter, paymentFilter, setPaymentFilter, priceRange, setPriceRange, onClear }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [tempStatus, setTempStatus] = useState<string>(statusFilter || "");
  const [tempPayment, setTempPayment] = useState<string>(paymentFilter || "");
  const [tempPrice, setTempPrice] = useState<[number, number]>(priceRange || [0, 50000000]);

  const handleChange = (panel: string) => (_: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (open) {
      setTempStatus(statusFilter || "");
      setTempPayment(paymentFilter || "");
      setTempPrice(priceRange || [0, 3000000]);
    }
  }, [open, statusFilter, paymentFilter, priceRange]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "12px" } }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 600, fontSize: "18px" }}>
        Bộ lọc
        <Button onClick={onClose} sx={{ minWidth: "auto", p: 0, color: "#999" }}>
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent dividers sx={{ p: "24px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Accordion expanded={expanded === "status"} onChange={handleChange("status")} sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>Trạng thái đơn hàng</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup value={tempStatus} onChange={(e) => setTempStatus(e.target.value)}>
                  <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                  <FormControlLabel value="pending" control={<Radio />} label="Chờ xử lý" />
                  <FormControlLabel value="paid" control={<Radio />} label="Đã thanh toán" />
                  <FormControlLabel value="processing" control={<Radio />} label="Đang xử lý" />
                  <FormControlLabel value="shipped" control={<Radio />} label="Đã gửi hàng" />
                  <FormControlLabel value="delivered" control={<Radio />} label="Đã giao" />
                  <FormControlLabel value="cancelled" control={<Radio />} label="Đã hủy" />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === "payment"} onChange={handleChange("payment")} sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>Phương thức thanh toán</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup value={tempPayment} onChange={(e) => setTempPayment(e.target.value)}>
                  <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                  <FormControlLabel value="COD" control={<Radio />} label="COD" />
                  <FormControlLabel value="Banking" control={<Radio />} label="Banking" />
                  <FormControlLabel value="Credit card" control={<Radio />} label="Credit card" />
                  <FormControlLabel value="Paypal" control={<Radio />} label="Paypal" />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expanded === "price"} onChange={handleChange("price")} sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>Tổng tiền</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontSize: "13px", color: "#666", mb: 1 }}>{formatCurrency(tempPrice[0])} - {formatCurrency(tempPrice[1])}</Typography>
              <Slider value={tempPrice} onChange={(_e, newValue) => setTempPrice(newValue as [number, number])} min={0} max={3000000} step={100000} valueLabelDisplay="off" sx={{ "& .MuiSlider-thumb": { backgroundColor: "#5c6ac4" }, "& .MuiSlider-track": { backgroundColor: "#5c6ac4" } }} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: "16px", gap: "12px" }}>
        <Button onClick={() => { setTempStatus(""); setTempPayment(""); setTempPrice([0,3000000]); onClear(); }} variant="outlined" sx={{ textTransform: "none", color: "#666", borderColor: "#ddd" }}>Xóa bộ lọc</Button>
        <Button onClick={() => { setStatusFilter(tempStatus); setPaymentFilter(tempPayment); setPriceRange(tempPrice); onClose(); }} variant="contained" sx={{ textTransform: "none", backgroundColor: "#5c6ac4", "&:hover": { backgroundColor: "#4a5aa8" } }}>Áp dụng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FiltersModal;
