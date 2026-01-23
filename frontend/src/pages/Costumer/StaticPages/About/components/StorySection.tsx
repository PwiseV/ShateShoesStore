import React from "react";

const StorySection: React.FC = () => {
  return (
    <div
      style={{
        padding: "80px 20px",
        display: "flex",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif", // Đảm bảo font chữ hiện đại
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "1100px",
          width: "100%",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left Image */}
        <div style={{ flex: "1 1 400px", zIndex: 1 }}>
          <img
            src="/imgs/anh-about-us.avif"
            alt="About Story"
            style={{
              width: "100%",
              borderRadius: "4px", // Bo góc nhẹ hơn cho giống hình
              objectFit: "cover",
              display: "block",
              boxShadow: "-10px 10px 20px rgba(0,0,0,0.1)", // Thêm bóng đổ nhẹ cho ảnh có chiều sâu
            }}
          />
        </div>

        {/* Right Content (Overlapping) */}
        <div
          style={{
            flex: "1 1 400px",
            backgroundColor: "#c5d5e0", // Màu xanh nhạt (giống hình hơn #DCE5EA)
            padding: "50px 40px", // Tăng padding một chút
            marginLeft: "-60px", // Hiệu ứng đè lên ảnh
            zIndex: 2,
            borderRadius: "4px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            minWidth: "300px",
          }}
        >
          {/* Header: About (Trắng) - Us (Xanh) */}
          <h2
            style={{
              fontSize: "3.5rem", // Font to hơn
              marginBottom: "15px",
              lineHeight: "1.1",
              fontWeight: "700",
            }}
          >
            <span style={{ color: "#ffffff" }}>About</span>{" "}
            <span style={{ color: "#354A54" }}>Us</span>
          </h2>

          <p
            style={{
              color: "#4a5b66",
              fontSize: "15px",
              marginBottom: "30px",
              lineHeight: 1.6,
              fontWeight: "500",
            }}
          >
            Chúng tôi mang đến những đôi giày được thiết kế để tôn vinh vẻ đẹp
            và sự tự tin của bạn trong từng bước đi.
          </p>

          {/* Dark Box */}
          <div
            style={{
              backgroundColor: "#2e3f4f", // Màu xanh xám đậm (dark slate)
              color: "#fff",
              padding: "35px",
              borderRadius: "2px",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                marginBottom: "20px",
                fontWeight: "600",
              }}
            >
              20 năm hình thành
            </h3>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.7,
                opacity: 0.95,
                marginBottom: "15px",
              }}
            >
              Từ những bước đi đầu tiên, một đôi giày đẹp không chỉ là phụ kiện,
              mà là{" "}
              <strong style={{ color: "#fff" }}>người bạn đồng hành</strong> của
              sự{" "}
              <strong style={{ color: "#fff" }}>tự tin và phong cách.</strong>
            </p>

            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.7,
                opacity: 0.95,
                marginBottom: "15px",
              }}
            >
              Mỗi đôi giày là một câu chuyện nhỏ, được thiết kế với tình yêu và
              sự tỉ mỉ trong từng đường nét – để bạn có thể bước đi{" "}
              <strong style={{ color: "#fff" }}>
                thật êm, thật đẹp, và thật chính mình.
              </strong>
            </p>

            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, opacity: 0.95 }}>
              Chúng tôi tin rằng,{" "}
              <strong style={{ color: "#fff" }}>
                vẻ đẹp bắt đầu từ cảm giác thoải mái
              </strong>
              , và sự tự tin toả sáng từ những bước chân vững vàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
