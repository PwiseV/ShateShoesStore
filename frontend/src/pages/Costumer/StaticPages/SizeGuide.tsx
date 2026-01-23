import React, { useEffect } from "react";
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";

const SizeGuideContent: React.FC = () => {
  // Dữ liệu các bước đo size
  const steps = [
    {
      title: "Bước 1: Chuẩn bị",
      content:
        "Bạn hãy chuẩn bị một tờ giấy trắng (to hơn bàn chân), một chiếc bút và một chiếc thước kẻ.",
    },
    {
      title: "Bước 2: Vẽ khung chân",
      content:
        "Đặt bàn chân lên tờ giấy, dùng bút vẽ bo theo khung bàn chân. Hãy chắc chắn rằng bạn giữ bút thẳng đứng vuông góc với mặt giấy.",
    },
    {
      title: "Bước 3: Đo chiều dài",
      content:
        "Dùng thước đo khoảng cách dài nhất từ gót chân đến ngón chân dài nhất. Làm tròn kết quả trong khoảng 0.5cm.",
    },
  ];

  // Dữ liệu bảng size (Ví dụ cho giày nữ/nam cơ bản)
  const sizeChart = [
    { size: "35", length: "22.0 - 22.5" },
    { size: "36", length: "22.5 - 23.0" },
    { size: "37", length: "23.0 - 23.5" },
    { size: "38", length: "23.5 - 24.0" },
    { size: "39", length: "24.0 - 24.5" },
    { size: "40", length: "24.5 - 25.0" },
    { size: "41", length: "25.0 - 25.5" },
    { size: "42", length: "25.5 - 26.0" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#F9F4EF",
        padding: "80px 20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* --- TITLE SECTION (Giữ nguyên style) --- */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#2C3E50",
            }}
          >
            Hướng dẫn <span style={{ color: "#5A7D8F" }}>Chọn Size</span>
          </h2>
          <p
            style={{
              color: "#555",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Một đôi giày hoàn hảo bắt đầu từ sự vừa vặn. Hãy dành ra 2 phút để
            đo kích thước chân theo hướng dẫn dưới đây của{" "}
            <strong>SHATE</strong> nhé.
          </p>
        </div>
        [Image of how to measure foot size diagram]
        {/* --- GRID LAYOUT CHO CÁC BƯỚC (Giữ nguyên style Card) --- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Responsive grid
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {steps.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.03)",
                borderLeft: "5px solid #5A7D8F", // Điểm nhấn đồng bộ
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  color: "#2C3E50",
                  fontWeight: "700",
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: "#666",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.content}
              </p>
            </div>
          ))}
        </div>
        {/* --- BẢNG SIZE (Mới thêm vào nhưng dùng style đồng bộ) --- */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.03)",
            marginBottom: "60px",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              color: "#2C3E50",
              marginBottom: "20px",
              fontWeight: "700",
            }}
          >
            Bảng quy đổi kích thước
          </h3>

          <div style={{ overflowX: "auto" }}>
            {" "}
            {/* Để scroll ngang trên mobile */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "500px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#5A7D8F", color: "#fff" }}>
                  <th style={{ padding: "15px", borderRadius: "8px 0 0 8px" }}>
                    Size SHATE
                  </th>
                  <th style={{ padding: "15px", borderRadius: "0 8px 8px 0" }}>
                    Chiều dài chân (cm)
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizeChart.map((row, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom:
                        index !== sizeChart.length - 1
                          ? "1px solid #eee"
                          : "none",
                      backgroundColor: index % 2 === 0 ? "#fff" : "#F9F9F9", // Zebra stripe nhẹ
                    }}
                  >
                    <td
                      style={{
                        padding: "15px",
                        fontWeight: "600",
                        color: "#2C3E50",
                      }}
                    >
                      {row.size}
                    </td>
                    <td style={{ padding: "15px", color: "#555" }}>
                      {row.length} cm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* --- BOTTOM BOX (Giữ nguyên từ mẫu cũ) --- */}
        <div
          style={{
            backgroundColor: "#2e3f4f",
            color: "#fff",
            padding: "50px",
            borderRadius: "16px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              Vẫn chưa chắc chắn?
            </h3>
            <p style={{ opacity: 0.9, margin: 0 }}>
              Đừng lo, đội ngũ tư vấn của SHATE sẽ giúp bạn chọn size chuẩn
              nhất.
            </p>
          </div>
          <button
            style={{
              backgroundColor: "#fff",
              color: "#2e3f4f",
              border: "none",
              padding: "12px 30px",
              fontWeight: "600",
              borderRadius: "50px",
              cursor: "pointer",
            }}
          >
            Nhắn tin tư vấn
          </button>
        </div>
      </div>
    </div>
  );
};

const SizeGuide: React.FC = () => {
  useEffect(() => {
    document.title = "SHATE - Hướng dẫn chọn size";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        background: "#F5EFEB",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <SizeGuideContent />
      <Footer />
    </div>
  );
};

export default SizeGuide;
