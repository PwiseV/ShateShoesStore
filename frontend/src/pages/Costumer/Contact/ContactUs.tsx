import React, { useState, useEffect } from "react";
import axios from "axios"; // 1. Import axios
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";

// --- CẤU HÌNH API URL ---
// Bạn thay đường dẫn này bằng API thật của Backend nhé
const API_URL = "https://your-backend-api.com/api/contact";

const ContactContent: React.FC = () => {
  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  // 2. Thêm state để quản lý trạng thái Loading (đang gửi)
  const [isLoading, setIsLoading] = useState(false);

  // Xử lý nhập liệu
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Xử lý gửi API (Async/Await)
  const handleSubmit = async () => {
    // Validate cơ bản (ví dụ: bắt buộc nhập email và sđt)
    if (!formData.email || !formData.phone) {
      alert("Vui lòng nhập Email và Số điện thoại!");
      return;
    }

    try {
      setIsLoading(true); // Bắt đầu gửi -> Bật loading

      // --- GỌI API ---
      const response = await axios.post(API_URL, formData);

      // Nếu thành công
      if (response.status === 200 || response.status === 201) {
        alert("Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ sớm.");
        // Reset form về rỗng
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      // Nếu thất bại
      console.error("Lỗi gửi form:", error);
      alert("Gửi thất bại. Vui lòng thử lại sau!");
    } finally {
      setIsLoading(false); // Kết thúc (dù thành công hay thất bại) -> Tắt loading
    }
  };

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');`}
      </style>

      <div
        style={{
          backgroundColor: "#F8F3EE",
          padding: "80px 0",
          fontFamily: "'Lexend', sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "60px",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          {/* --- CỘT TRÁI (GIỮ NGUYÊN) --- */}
          <div
            style={{
              flex: "1 1 450px",
              paddingTop: "20px",
              paddingLeft: "90px",
              paddingRight: "20px",
            }}
          >
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#333",
                marginBottom: "15px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Chúng tôi ở đây để giúp bạn
            </h4>
            <h1
              style={{
                fontSize: "4.5rem",
                fontWeight: "800",
                color: "#2C3E50",
                lineHeight: "1.1",
                marginBottom: "30px",
                textTransform: "capitalize",
              }}
            >
              Đề Xuất <br /> Giải Pháp <br /> Bạn Cần
            </h1>
            <p
              style={{
                color: "#555",
                lineHeight: 1.6,
                fontSize: "0.95rem",
                fontWeight: "300",
                marginBottom: "40px",
                maxWidth: "480px",
              }}
            >
              Chúng tôi luôn tin rằng mọi kết nối đều bắt đầu từ sự thấu hiểu và
              chân thành.
            </p>
            {/* Contact Info Items (Giữ nguyên code cũ) */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "25px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="#2C3E50"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                  />
                </svg>
                <div>
                  <p
                    style={{
                      margin: "0 0 5px 0",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      textAlign: "left",
                      color: "#666",
                    }}
                  >
                    Số điện thoại
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      textAlign: "left",
                      color: "#2C3E50",
                    }}
                  >
                    +84 123 456 7890
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="#2C3E50"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                </svg>
                <div>
                  <p
                    style={{
                      margin: "0 0 5px 0",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      textAlign: "left",
                      color: "#666",
                    }}
                  >
                    Email
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      textAlign: "left",
                      color: "#2C3E50",
                    }}
                  >
                    abc@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- CỘT PHẢI: FORM (CẬP NHẬT PHẦN BUTTON) --- */}
          <div
            style={{
              flex: "1 1 500px",
              backgroundColor: "#DBE4EA",
              padding: "50px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              textAlign: "left",
            }}
          >
            <form style={{ display: "grid", gap: "25px" }}>
              {/* Các input giữ nguyên, chỉ đảm bảo name, value, onChange đúng */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: "600",
                      marginBottom: "10px",
                      color: "#546E7A",
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Huong"
                    style={{
                      width: "100%",
                      padding: "18px 25px",
                      borderRadius: "50px",
                      border: "none",
                      outline: "none",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "0.95rem",
                      fontFamily: "'Lexend', sans-serif",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: "600",
                      marginBottom: "10px",
                      color: "#546E7A",
                    }}
                  >
                    Họ
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Nguyen"
                    style={{
                      width: "100%",
                      padding: "18px 25px",
                      borderRadius: "50px",
                      border: "none",
                      outline: "none",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "0.95rem",
                      fontFamily: "'Lexend', sans-serif",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: "600",
                      marginBottom: "10px",
                      color: "#546E7A",
                    }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456 - 789"
                    style={{
                      width: "100%",
                      padding: "18px 25px",
                      borderRadius: "50px",
                      border: "none",
                      outline: "none",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "0.95rem",
                      fontFamily: "'Lexend', sans-serif",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontWeight: "600",
                      marginBottom: "10px",
                      color: "#546E7A",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    style={{
                      width: "100%",
                      padding: "18px 25px",
                      borderRadius: "50px",
                      border: "none",
                      outline: "none",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "0.95rem",
                      fontFamily: "'Lexend', sans-serif",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "10px",
                    color: "#546E7A",
                  }}
                >
                  Leave us a message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please type your message here..."
                  rows={6}
                  style={{
                    width: "100%",
                    padding: "20px 25px",
                    borderRadius: "20px",
                    border: "none",
                    outline: "none",
                    backgroundColor: "#fff",
                    color: "#666",
                    resize: "none",
                    fontSize: "0.95rem",
                    fontFamily: "'Lexend', sans-serif",
                  }}
                />
              </div>

              {/* --- 4. CẬP NHẬT NÚT BẤM (XỬ LÝ LOADING) --- */}
              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading} // Khóa nút khi đang gửi
                  style={{
                    backgroundColor: isLoading ? "#78909C" : "#546E7A", // Đổi màu khi loading
                    color: "#fff",
                    border: "none",
                    padding: "16px 45px",
                    fontSize: "1rem",
                    fontWeight: "500",
                    borderRadius: "50px",
                    cursor: isLoading ? "not-allowed" : "pointer", // Đổi con trỏ chuột
                    marginTop: "10px",
                    boxShadow: "0 5px 15px rgba(84, 110, 122, 0.3)",
                    transition: "all 0.2s ease",
                    fontFamily: "'Lexend', sans-serif",
                    opacity: isLoading ? 0.7 : 1, // Làm mờ nhẹ
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  onMouseOver={(e) => {
                    if (!isLoading) e.currentTarget.style.opacity = "0.9";
                  }}
                  onMouseOut={(e) => {
                    if (!isLoading) e.currentTarget.style.opacity = "1";
                  }}
                >
                  {isLoading ? "Sending..." : "Send message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const ContactUs: React.FC = () => {
  useEffect(() => {
    document.title = "SHATE - Liên hệ";
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
      <ContactContent />
      <Footer />
    </div>
  );
};

export default ContactUs;
