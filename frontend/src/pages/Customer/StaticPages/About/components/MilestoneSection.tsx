import React from "react";

interface StatItem {
  number: string;
  label: string;
  bg: string;
  text: string;
}

const MilestoneSection: React.FC = () => {
  const stats: StatItem[] = [
    {
      number: "103+",
      label: "Mẫu giày",
      bg: "#FFFFFF",
      text: "#333",
    },
    {
      number: "98%",
      label: "Khách hàng hài lòng",
      bg: "#DCE5EA",
      text: "#333",
    },
    {
      number: "200+",
      label: "Khách hàng đã chọn đồng hành",
      bg: "#5A7D8F",
      text: "#FFF",
    },
  ];

  return (
    <div
      style={{
        padding: "0 20px 80px 20px",
        maxWidth: "1100px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "#2C3E50",
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "40px",
        }}
      >
        Những cột mốc đáng nhớ
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {stats.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: item.bg,
              color: item.text,
              padding: "40px 30px 25px 30px",
              borderRadius: "20px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minHeight: "220px",
              position: "relative",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {/* LOGO GÓC PHẢI */}
            <img
              src="logo-mau-trang.avif"
              alt="Logo icon"
              style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "200px",
                height: "auto",
                opacity: 0.9,
                filter: item.text === "#FFF" ? "none" : "brightness(0.2)",
                transition: "all 0.3s ease",
                objectFit: "contain",
                pointerEvents: "none",
              }}
            />

            <h3
              style={{
                fontSize: "3.5rem",
                fontWeight: 700,
                margin: "0 0 5px 0",
                lineHeight: 1,
                position: "relative",
                zIndex: 2,
              }}
            >
              {item.number}
            </h3>
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                margin: 0,
                position: "relative",
                zIndex: 2,
              }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneSection;
