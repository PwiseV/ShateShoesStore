import bannerHompage from "../../../../assets/bannerHompage.png";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Paper, Box } from "@mui/material";
const Banner = () => {
  return (
    <div>
      <section
        style={{
          maxWidth: "1200px",
          alignItems: "center",
          padding: "0 2rem",
          margin: "0 auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            display: "flex",
            backgroundColor: "transparent",
            boxShadow: "none",
            alignItems: "flex-end",
            minHeight: "500px",
            overflow: "hidden",
          }}
        >
          <img
            src={bannerHompage}
            alt="Banner"
            style={{
              width: "100%",
              maxWidth: "1200px",
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.15))",
              zIndex: 1,
              position: "absolute",
              left: 0,
              right:0,
              opacity: 0.8,
            }}
          />
          <div
            style={{ display: "flex", zIndex: 2, width: "100%" }}
          >
            <Box className="flex-1">
              <h1
                style={{
                  fontSize: "clamp(2rem, 5vw, 1.5rem)",
                  lineHeight: "1.4",
                  color: "#334E68",
                  fontWeight: 700,
                  textAlign: "left",
                  marginLeft: "40px"
                }}
              >
                Find The Best Fashion Shoes <br /> Style For You
              </h1>
            </Box>
            <Box
              className="flex-1"
              sx={{
                paddingLeft: "10rem",
              }}
            >
              <p
                style={{
                  color: "#102A43",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                  textAlign: "left",
                }}
              >
                Mỗi đôi giày được sinh ra từ <br /> niềm tin rằng sự tự tin và
                thanh lịch <br /> bắt nguồn từ những điều nhỏ bé.
              </p>
              <div style={{ display: "flex" }}>
                <button
                  style={{
                    background: "#546E7A",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  SHOP NOW <ShoppingBagIcon fontSize="small"/>
                </button>
              </div>
            </Box>
          </div>
        </Paper>
      </section>
    </div>
  );
};

export default Banner;
