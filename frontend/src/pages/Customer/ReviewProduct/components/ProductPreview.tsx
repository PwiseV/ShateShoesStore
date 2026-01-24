import React from "react";
import { Box } from "@mui/material";

interface Props {
  image: string;
}

const ProductPreview = ({ image }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default ProductPreview;
