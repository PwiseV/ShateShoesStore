import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

export type ReviewFormValues = {
  author: string;
  rating: number;
  comment: string;
};

export type ReviewFormProps = {
  initialValues?: Partial<ReviewFormValues>;
  onSubmit?: (values: ReviewFormValues) => void;
  className?: string;
};

const ReviewForm: React.FC<ReviewFormProps> = ({
  initialValues,
  onSubmit,
  className,
}) => {
  const [author, setAuthor] = useState(initialValues?.author ?? "");
  const [rating, setRating] = useState(initialValues?.rating ?? 5);
  const [comment, setComment] = useState(initialValues?.comment ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ author, rating, comment });
  };

  return (
    <Box component="form" className={className} onSubmit={handleSubmit}>
      <Stack spacing={1.5}>
        <TextField
          label="Tên"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Tên của bạn"
          size="small"
          required
        />
        <TextField
          label="Đánh giá"
          select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          size="small"
          required
        >
          {[5, 4, 3, 2, 1].map((v) => (
            <MenuItem key={v} value={v}>
              {v} sao
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Nhận xét"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Chia sẻ cảm nhận của bạn"
          multiline
          minRows={4}
          required
        />
        <Box>
          <Button type="submit" variant="contained">
            Gửi đánh giá
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ReviewForm;
