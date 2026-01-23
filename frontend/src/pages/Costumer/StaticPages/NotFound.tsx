import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";

const NotFoundContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "#F8F3EE", // Màu nền kem đồng bộ
        padding: "100px 20px",
        fontFamily: "'Lexend', sans-serif",
        minHeight: "70vh", // Chiều cao tối thiểu để đẩy Footer xuống dưới
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* --- SỐ 404 LỚN --- */}
      <h1
        style={{
          fontSize: "10rem", // Cỡ chữ siêu lớn
          fontWeight: "900",
          color: "#DBE4EA", // Màu nhạt để làm nền chìm
          lineHeight: "0.8",
          margin: "0",
          textShadow: "2px 2px 0px #fff", // Hiệu ứng đổ bóng nhẹ
        }}
      >
        404
      </h1>

      {/* --- TIÊU ĐỀ THÔNG BÁO --- */}
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "#2C3E50",
          marginTop: "-20px", // Kéo lên đè nhẹ vào số 404 tạo layer
          marginBottom: "20px",
        }}
      >
        Oops! Không tìm thấy trang
      </h2>

      {/* --- MÔ TẢ --- */}
      <p
        style={{
          color: "#546E7A",
          fontSize: "1.1rem",
          lineHeight: "1.6",
          maxWidth: "600px",
          marginBottom: "40px",
          fontWeight: "400",
        }}
      >
        Có vẻ như trang bạn đang tìm kiếm không tồn tại, đã bị xóa hoặc đường
        dẫn bị lỗi. Đừng lo lắng, hãy quay về trang chủ để tiếp tục mua sắm nhé.
      </p>

      {/* --- NÚT QUAY VỀ HOME --- */}
      <button
        onClick={() => navigate("/")} // Chuyển về trang chủ
        style={{
          backgroundColor: "#546E7A",
          color: "#fff",
          border: "none",
          padding: "18px 50px",
          fontSize: "1rem",
          fontWeight: "600",
          borderRadius: "50px", // Bo tròn viên thuốc
          cursor: "pointer",
          boxShadow: "0 10px 20px rgba(84, 110, 122, 0.2)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          fontFamily: "'Lexend', sans-serif",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow =
            "0 15px 25px rgba(84, 110, 122, 0.3)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 10px 20px rgba(84, 110, 122, 0.2)";
        }}
      >
        Quay về Trang chủ
      </button>
    </div>
  );
};

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "SHATE - 404 Not Found";
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
      {/* Nhúng lại Font Lexend phòng trường hợp trang này load độc lập */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');`}
      </style>

      <Header />
      <NotFoundContent />
      <Footer />
    </div>
  );
};

export default NotFound;
