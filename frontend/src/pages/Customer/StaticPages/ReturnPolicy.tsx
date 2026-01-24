import React, { useEffect } from "react";
// Nhớ kiểm tra lại đường dẫn import Header/Footer nhé
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";

// --- COMPONENT NỘI DUNG ---
const ReturnContent: React.FC = () => {
  const policies = [
    {
      title: "1. Điều kiện đổi trả",
      content:
        "Sản phẩm phải còn nguyên tem mác, hộp giày, chưa qua sử dụng và không bị bẩn/hư hỏng do tác động bên ngoài. Áp dụng cho cả đơn hàng mua Online và tại Cửa hàng.",
    },
    {
      title: "2. Thời gian áp dụng",
      content:
        "SHATE hỗ trợ đổi hàng trong vòng 07 ngày kể từ ngày quý khách nhận được sản phẩm (tính theo dấu bưu điện hoặc biên lai nhận hàng).",
    },
    {
      title: "3. Chi phí vận chuyển",
      content:
        "Miễn phí 100% phí ship nếu lỗi do nhà sản xuất hoặc giao sai mẫu. Trường hợp khách hàng muốn đổi size/mẫu theo sở thích, quý khách vui lòng thanh toán phí ship 2 chiều.",
    },
    {
      title: "4. Quy trình xử lý",
      // Dùng dấu backtick ` ` để viết xuống dòng thoải mái trong code
      content: `Bước 1: Liên hệ Fanpage/Hotline.
Bước 2: Gửi hàng về kho SHATE.
Bước 3: SHATE kiểm tra sản phẩm.
Bước 4: Gửi sản phẩm mới cho bạn (Thời gian xử lý: 3-5 ngày).`,
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
        {/* Title Section - Căn trái như yêu cầu */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#2C3E50",
            }}
          >
            Chính sách <span style={{ color: "#5A7D8F" }}>Đổi trả</span>
          </h2>
          <p
            style={{
              color: "#555",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Mua giày Online không lo lệch size. SHATE luôn sẵn sàng hỗ trợ bạn
            đổi trả nhanh chóng và thuận tiện nhất.
          </p>
        </div>

        {/* LIST LAYOUT - Dọc */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginBottom: "60px",
          }}
        >
          {policies.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "30px 40px",
                borderRadius: "12px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.03)",
                borderLeft: "5px solid #5A7D8F", // Điểm nhấn viền trái
                transition: "transform 0.2s ease",
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
                  lineHeight: 1.8,
                  margin: 0,
                  whiteSpace: "pre-line",
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
              Cần đổi size ngay?
            </h3>
            <p style={{ opacity: 0.9, margin: 0 }}>
              Đừng lo, liên hệ ngay với chúng tôi để được hướng dẫn chi tiết.
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
            Nhắn tin hỗ trợ
          </button>
        </div>
      </div>
    </div>
  );
};

// --- TRANG CHÍNH ---
const ReturnPolicy: React.FC = () => {
  useEffect(() => {
    document.title = "SHATE - Chính sách đổi trả";
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
      <ReturnContent />
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
