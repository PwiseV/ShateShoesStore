import { Box, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Img1 from "../../../../assets/Collection_1.png";
import Img2 from "../../../../assets/Collection_2.png";
import Img3 from "../../../../assets/Collection_3.png";
import Img4 from "../../../../assets/Collection_4.png";

function srcsetLocal(image: string) {
  return {
    src: image,
    srcSet: `${image} 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <Box
      component="section"
      sx={{
        py: 6,
        px: { xs: 2, md: 4 },
        background: "#E2E8EC",
        mx: "auto",
        maxWidth: "1150px",
        borderRadius: "30px",
        marginBottom: "3rem",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={700}
        textAlign="center"
        mb={6}
        sx={{ color: "#2C3E50" }}
      >
        Graceful Steps Collection
      </Typography>

      <ImageList
        variant="quilted"
        cols={3}
        rows={4}
        rowHeight={150}
        gap={16}
        sx={{
          width: "100%",
          m: 0,
          bgcolor: "transparent",
        }}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            sx={{
              overflow: "hidden",
              borderRadius: "20px",
            }}
          >
            <img
              {...srcsetLocal(item.img)}
              alt={item.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: Img1,
    title: "Img1",
    cols: 2,
    rows: 2,
  },
  {
    img: Img3,
    title: "Img3",
    cols: 1,
    rows: 4,
  },
  {
    img: Img2,
    title: "Img2",
    cols: 1, 
    rows: 2,
  },
  {
    img: Img4,
    title: "Img4",
    cols: 1,
    rows: 2,
  },
];
