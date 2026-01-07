import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Divider, Slider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
          <Box>
            <Typography sx={{ fontWeight: 600, mb: "12px", fontSize: "14px" }}>Lọc trạng thái đơn hàng</Typography>
            <FormControl component="fieldset">
              <RadioGroup value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                <FormControlLabel value="pending" control={<Radio />} label="Chờ xử lý" />
                <FormControlLabel value="paid" control={<Radio />} label="Đã thanh toán" />
                <FormControlLabel value="processing" control={<Radio />} label="Đang xử lý" />
                <FormControlLabel value="shipped" control={<Radio />} label="Đã gửi hàng" />
                <FormControlLabel value="delivered" control={<Radio />} label="Đã giao" />
                <FormControlLabel value="cancelled" control={<Radio />} label="Đã hủy" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Divider />

          <Box>
            <Typography sx={{ fontWeight: 600, mb: "12px", fontSize: "14px" }}>Lọc phương thức thanh toán</Typography>
            <FormControl component="fieldset">
              <RadioGroup value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
                <FormControlLabel value="" control={<Radio />} label="Tất cả" />
                <FormControlLabel value="COD" control={<Radio />} label="COD" />
                <FormControlLabel value="Banking" control={<Radio />} label="Banking" />
                <FormControlLabel value="Credit card" control={<Radio />} label="Credit card" />
                <FormControlLabel value="Paypal" control={<Radio />} label="Paypal" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Divider />

          <Box>
            <Typography sx={{ fontWeight: 600, mb: "12px", fontSize: "14px" }}>Lọc theo tổng tiền</Typography>
            <Typography sx={{ fontSize: "12px", color: "#666", mb: "12px" }}>{formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}</Typography>
            <Slider value={priceRange} onChange={(e, newValue) => setPriceRange(newValue as [number, number])} min={0} max={3000000} step={100000} valueLabelDisplay="off" sx={{ "& .MuiSlider-thumb": { backgroundColor: "#5c6ac4" }, "& .MuiSlider-track": { backgroundColor: "#5c6ac4" } }} />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: "16px", gap: "12px" }}>
        <Button onClick={onClear} variant="outlined" sx={{ textTransform: "none", color: "#666", borderColor: "#ddd" }}>Xóa bộ lọc</Button>
        <Button onClick={onClose} variant="contained" sx={{ textTransform: "none", backgroundColor: "#5c6ac4", "&:hover": { backgroundColor: "#4a5aa8" } }}>Áp dụng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FiltersModal;
