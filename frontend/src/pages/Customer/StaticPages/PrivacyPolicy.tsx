import React, { useEffect } from "react";
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";

const PrivacyContent: React.FC = () => {
  const policies = [
    {
      title: "1. Thu thập thông tin",
      content:
        "Chúng tôi chỉ thu thập những thông tin cần thiết (tên, số điện thoại, địa chỉ giao hàng) để xử lý đơn hàng và nâng cao trải nghiệm của bạn tại SHATE.",
    },
    {
      title: "2. Sử dụng thông tin",
      content:
        "Thông tin được dùng để: Xử lý đơn hàng, gửi thông báo vận chuyển, và cập nhật ưu đãi. Chúng tôi cam kết không spam.",
    },
    {
      title: "3. Bảo mật dữ liệu",
      content:
        "SHATE áp dụng các biện pháp bảo mật kỹ thuật số tiên tiến nhất để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép.",
    },
    {
      title: "4. Chia sẻ thông tin",
      content:
        "Chúng tôi cam kết KHÔNG bán, trao đổi thông tin cá nhân cho bên thứ ba, ngoại trừ đơn vị vận chuyển để giao hàng.",
    },
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
        {" "}
        {/* Giảm maxWidth chút cho dễ đọc */}
        {/* Title Section */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#2C3E50",
            }}
          >
            Chính sách <span style={{ color: "#5A7D8F" }}>Bảo mật</span>
          </h2>
          <p
            style={{
              color: "#555",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Tại <strong>SHATE</strong>, sự an tâm của bạn quan trọng như sự
            thoải mái của đôi chân. Chúng tôi cam kết bảo vệ sự riêng tư của bạn
            một cách minh bạch và an toàn nhất.
          </p>
        </div>
        {/* LIST LAYOUT (Sửa phần này) */}
        <div
          style={{
            display: "flex", // Dùng Flexbox
            flexDirection: "column", // Xếp theo chiều dọc
            gap: "20px", // Khoảng cách giữa các ô
            marginBottom: "60px",
          }}
        >
          {policies.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "30px 40px", // Padding rộng rãi
                borderRadius: "12px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.03)",
                borderLeft: "5px solid #5A7D8F", // Thêm điểm nhấn viền trái cho đẹp
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  color: "#2C3E50",
                  fontWeight: "700",
                  marginBottom: "10px",
                  textAlign: "left",
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: "#666",
                  lineHeight: 1.6,
                  margin: 0,
                  textAlign: "left",
                }}
              >
                {item.content}
              </p>
            </div>
          ))}
        </div>
        {/* Bottom Box */}
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
              Quyền lợi là ưu tiên số 1
            </h3>
            <p style={{ opacity: 0.9, margin: 0 }}>
              Có thắc mắc? Chúng tôi luôn sẵn sàng lắng nghe.
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/contact-us'}
            style={{
              backgroundColor: "#fff",
              color: "#2e3f4f",
              border: "none",
              padding: "12px 30px",
              fontWeight: "600",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Liên hệ ngay
          </button>
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = "SHATE - Chính sách bảo mật";
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
      <PrivacyContent />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
