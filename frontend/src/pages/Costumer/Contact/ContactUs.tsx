import React, { useState, useEffect } from "react";
import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import { useToast } from "../../../context/useToast"; 
import { submitContact } from "../../../services/contactServices";

// --- STYLES ---
const STYLES = {
  container: {
    backgroundColor: "#F8F3EE",
    padding: "80px 0",
    fontFamily: "'Lexend', sans-serif",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  formWrapper: {
    flex: "1 1 500px",
    backgroundColor: "#DBE4EA",
    padding: "50px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    textAlign: "left",
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "18px 25px",
    borderRadius: "50px",
    border: "none",
    outline: "none",
    backgroundColor: "#fff",
    color: "#333",
    fontFamily: "'Lexend', sans-serif",
  } as React.CSSProperties,
  errorText: {
    color: "#E74C3C",
    fontSize: "0.8rem",
    marginLeft: "15px",
    marginTop: "5px",
    display: "block",
  } as React.CSSProperties,
};

const ContactContent: React.FC = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { phone: "", email: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập Email.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng.";
      isValid = false;
    }

    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!formData.phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại.";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ.";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) showToast("Vui lòng kiểm tra lại thông tin!", "error");
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await submitContact(formData);
      if (response) {
        showToast("Gửi tin nhắn thành công!", "success");
        setFormData({ firstName: "", lastName: "", phone: "", email: "", message: "" });
      }
    } catch (error: any) {
      showToast(error.response?.data?.message || "Gửi thất bại!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
      </style>

      <div style={STYLES.container}>
        <div style={{ maxWidth: "1200px", width: "100%", display: "flex", flexWrap: "wrap", gap: "60px", padding: "0 20px" }}>
          
          {/* CỘT TRÁI: THÔNG TIN LIÊN HỆ - ĐÃ CĂN TRÁI SÁT MÉP */}
          <div style={{ flex: "1 1 450px", textAlign: "left" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "#333", marginBottom: "15px", textTransform: "uppercase", letterSpacing: "1px" }}>
              Chúng tôi ở đây để giúp bạn
            </h4>
            <h1 style={{ fontSize: "4.5rem", fontWeight: "800", color: "#2C3E50", lineHeight: "1.1", marginBottom: "30px" }}>
              Đề Xuất <br /> Giải Pháp <br /> Bạn Cần
            </h1>
            <p style={{ color: "#555", lineHeight: 1.6, fontSize: "1rem", fontWeight: "300", marginBottom: "40px", maxWidth: "500px" }}>
              Chúng tôi luôn tin rằng mọi kết nối đều bắt đầu từ sự thấu hiểu và chân thành. Hãy để lại lời nhắn, chúng tôi sẽ phản hồi sớm nhất.
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ backgroundColor: "#fff", padding: "12px", borderRadius: "50%", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
                    <svg width="24" height="24" fill="#2C3E50" viewBox="0 0 16 16"><path d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" /></svg>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#666", fontWeight: "500" }}>Số điện thoại</p>
                  <p style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700", color: "#2C3E50" }}>+84 123 456 7890</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ backgroundColor: "#fff", padding: "12px", borderRadius: "50%", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
                    <svg width="24" height="24" fill="#2C3E50" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" /></svg>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#666", fontWeight: "500" }}>Email</p>
                  <p style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700", color: "#2C3E50" }}>abc@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: FORM */}
          <div style={STYLES.formWrapper}>
            <form style={{ display: "grid", gap: "25px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#546E7A" }}>Tên</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Huong" style={STYLES.input} />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#546E7A" }}>Họ</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Nguyen" style={STYLES.input} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#546E7A" }}>Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="090 123 4567"
                    style={{ ...STYLES.input, border: errors.phone ? "2px solid #E74C3C" : "none" }}
                  />
                  {errors.phone && <span style={STYLES.errorText}>{errors.phone}</span>}
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#546E7A" }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    style={{ ...STYLES.input, border: errors.email ? "2px solid #E74C3C" : "none" }}
                  />
                  {errors.email && <span style={STYLES.errorText}>{errors.email}</span>}
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "8px", color: "#546E7A" }}>Tin nhắn</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nhập tin nhắn của bạn tại đây..."
                  rows={6}
                  style={{ ...STYLES.input, borderRadius: "20px", resize: "none" }}
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  backgroundColor: isLoading ? "#78909C" : "#546E7A",
                  color: "#fff",
                  border: "none",
                  padding: "16px 45px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  borderRadius: "50px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 5px 15px rgba(84, 110, 122, 0.3)",
                }}
              >
                {isLoading ? (
                  <>
                    <span style={{ width: "16px", height: "16px", border: "2px solid #fff", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></span>
                    Đang gửi...
                  </>
                ) : "Gửi tin nhắn"}
              </button>
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
    <div style={{ background: "#F5EFEB", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <ContactContent />
      <Footer />
    </div>
  );
};

export default ContactUs;