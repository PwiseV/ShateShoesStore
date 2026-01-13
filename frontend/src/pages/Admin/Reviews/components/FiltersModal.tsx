import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { statusConfig, starConfig } from "../constants";

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (status: string[], stars: number[]) => void;
}

const FiltersModal: React.FC<Props> = ({ open, onClose, onApply }) => {
  const [tempStatus, setTempStatus] = useState<string[]>([]);
  const [tempStars, setTempStars] = useState<number[]>([]);

  const handleStatusChange = (status: string, checked: boolean) => {
    setTempStatus((prev) =>
      checked ? [...prev, status] : prev.filter((s) => s !== status)
    );
  };

  const handleStarsChange = (star: number, checked: boolean) => {
    setTempStars((prev) =>
      checked ? [...prev, star] : prev.filter((s) => s !== star)
    );
  };

  const handleApply = () => {
    onApply(tempStatus, tempStars);
    onClose();
  };

  const handleClear = () => {
    setTempStatus([]);
    setTempStars([]);
    onApply([], []);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: "18px" }}>
        Bộ lọc
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Status Filter */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>Trạng thái</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {Object.entries(statusConfig).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={tempStatus.includes(key)}
                        onChange={(e) =>
                          handleStatusChange(key, e.target.checked)
                        }
                      />
                    }
                    label={value.label}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>

          {/* Stars Filter */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>Số sao</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup>
                {Object.entries(starConfig).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={tempStars.includes(parseInt(key))}
                        onChange={(e) =>
                          handleStarsChange(parseInt(key), e.target.checked)
                        }
                      />
                    }
                    label={value}
                  />
                ))}
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClear} variant="outlined">
          Xóa bộ lọc
        </Button>
        <Button onClick={handleApply} variant="contained">
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FiltersModal;
