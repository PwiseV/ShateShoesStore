import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface FAQItemProps {
  question: string;
  answer: string;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  expanded,
  onChange,
}) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      elevation={0}
      disableGutters
      sx={{
        bgcolor: "white",
        borderRadius: "16px !important", // Bo góc giống thẻ bài viết
        mb: 2, // Khoảng cách giữa các câu hỏi
        boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
        "&:before": { display: "none" }, // Xóa đường kẻ mặc định của MUI
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon sx={{ color: "#2C3E50", fontSize: "1.5rem" }} />
        }
        sx={{
          px: 4,
          py: 1,
          "& .MuiAccordionSummary-content": {
            my: 2,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#2C3E50",
            fontFamily: '"Lexend", sans-serif',
            fontSize: "1.1rem",
          }}
        >
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 4, pb: 4, pt: 0 }}>
        <Typography
          variant="body1"
          sx={{
            color: "#567C8D", // Màu chữ nội dung (xám xanh)
            lineHeight: 1.6,
            fontFamily: '"Lexend", sans-serif',
          }}
        >
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default FAQItem;
