import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaShoppingCart,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";
import logoImg from "../assets/logo3.svg";

// --- 1. SUB-COMPONENTS ---

const Header = () => (
  <nav
    style={{
      background: "white",
      maxWidth: "1200px",
      margin: "1rem auto",
      padding: "0.8rem 2rem",
      borderRadius: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      position: "sticky",
      top: "1rem",
      zIndex: 100,
    }}
  >
    <Link
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        textDecoration: "none",
        color: "#334E68",
      }}
    >
      <span style={{ fontSize: "1.5rem" }}>👟</span>
      <span
        style={{ fontSize: "1.2rem", fontWeight: 700, letterSpacing: "1px" }}
      >
        shate
      </span>
    </Link>

    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      {["Giới thiệu", "Tin tức", "Danh mục", "Thư cũ đổi mới"].map(
        (item, index) => (
          <Link
            key={index}
            to="/"
            style={{
              textDecoration: "none",
              color: "#627D98",
              fontWeight: 500,
              fontSize: "0.95rem",
            }}
          >
            {item}
          </Link>
        )
      )}
    </div>

    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#627D98",
        }}
      >
        <FaShoppingCart size={20} />
      </button>
      <Link to="/signin" style={{ color: "#627D98" }}>
        <FaUser size={18} />
      </Link>
    </div>
  </nav>
);

const HeroSection = () => (
  <section
    style={{
      maxWidth: "1200px",
      margin: "3rem auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      alignItems: "center",
      padding: "0 2rem",
    }}
  >
    <div style={{ position: "relative" }}>
      <img
        src={logoImg}
        alt="SHATE Logo"
        style={{
          width: "100%",
          maxWidth: "450px",
          transform: "rotate(-25deg)",
          filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.15))",
          zIndex: 2,
          position: "relative",
        }}
      />
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          lineHeight: "1.1",
          color: "#334E68",
          fontWeight: 800,
          marginTop: "2rem",
          zIndex: 1,
          position: "relative",
        }}
      >
        Find The Best <br /> Fashion Shoes <br /> Style For You
      </h1>
    </div>
    <div style={{ paddingLeft: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "2rem",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600"
          alt="Blue Shoe"
          style={{
            width: "100%",
            maxWidth: "480px",
            transform: "rotate(-15deg)",
            filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.15))",
          }}
        />
      </div>
      <p
        style={{
          color: "#102A43",
          fontSize: "1rem",
          lineHeight: "1.6",
          fontWeight: 500,
          marginBottom: "2rem",
          maxWidth: "400px",
          marginLeft: "auto",
        }}
      >
        Mỗi đôi giày được sinh ra từ niềm tin rằng sự tự tin và thanh lịch bắt
        nguồn từ những điều nhỏ bé.
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            background: "#546E7A",
            color: "white",
            border: "none",
            padding: "1rem 2.5rem",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          SHOP NOW <FaArrowRight />
        </button>
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section
    style={{ padding: "3rem 2rem", maxWidth: "1400px", margin: "0 auto" }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem",
      }}
    >
      {/* Card 1: Stats */}
      <div
        style={{
          background: "linear-gradient(135deg, #B8C5D6 0%, #A0B5CC 100%)",
          borderRadius: "20px",
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "3px",
            }}
          >
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                style={{
                  width: "10px",
                  height: "10px",
                  background: "#4A7C9E",
                  borderRadius: "50%",
                }}
              ></span>
            ))}
          </div>
          <span style={{ fontWeight: 600, fontSize: "1rem", color: "#2C3E50" }}>
            brix templates
          </span>
        </div>
        <div style={{ display: "flex", gap: "3rem" }}>
          {[
            { num: "103+", text: "Sản phẩm\ntrong kho" },
            { num: "15+", text: "Đã bán trên\ntoàn quốc" },
          ].map((stat, i) => (
            <div key={i}>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#2C3E50",
                  margin: 0,
                }}
              >
                {stat.num}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#555",
                  whiteSpace: "pre-line",
                }}
              >
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Card 2: Who We Are */}
      <div
        style={{
          background: "linear-gradient(135deg, #4A7C9E 0%, #3A6C8E 100%)",
          borderRadius: "20px",
          padding: "3rem",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}
        >
          Who We Are
        </h2>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: "1.8",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Bởi mỗi bước chân đều xứng đáng được nâng niu — chúng tôi tạo nên
          những đôi giày kết hợp giữa thành tích, thoải mái và phong cách.
        </p>
      </div>

      {/* Card 3: Image */}
      <div
        style={{
          background: "#E8E4DC",
          borderRadius: "20px",
          overflow: "hidden",
          minHeight: "300px",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500"
          alt="Sneakers"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  </section>
);

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ val, label }) => (
    <div style={{ textAlign: "center", minWidth: "60px" }}>
      <div style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1 }}>
        {String(val).padStart(2, "0")}
      </div>
      <div
        style={{
          fontSize: "0.7rem",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)",
          letterSpacing: "1px",
          marginTop: "5px",
        }}
      >
        {label}
      </div>
    </div>
  );

  return (
    <section
      style={{ padding: "3rem 2rem", maxWidth: "1400px", margin: "0 auto" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {/* Countdown Area */}
        <div
          style={{
            background: "linear-gradient(135deg, #3A5A6C 0%, #2C4A5C 100%)",
            borderRadius: "20px",
            padding: "3rem",
            color: "white",
            gridColumn: "span 2",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                Flash Sale!
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.85)",
                  maxWidth: "500px",
                }}
              >
                Thời gian ưu đãi đặc biệt đã bắt đầu - hãy để đôi giày hoàn hảo
                nâng bước bạn với mức giá ưu đãi chỉ trong thời gian giới hạn.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginTop: "2rem",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <TimeBox val={timeLeft.days} label="Days" />
                <span
                  style={{ fontSize: "2rem", margin: "0 10px", opacity: 0.5 }}
                >
                  :
                </span>
                <TimeBox val={timeLeft.hours} label="Hours" />
                <span
                  style={{ fontSize: "2rem", margin: "0 10px", opacity: 0.5 }}
                >
                  :
                </span>
                <TimeBox val={timeLeft.minutes} label="Mins" />
                <span
                  style={{ fontSize: "2rem", margin: "0 10px", opacity: 0.5 }}
                >
                  :
                </span>
                <TimeBox val={timeLeft.seconds} label="Secs" />
              </div>
              <button
                style={{
                  marginLeft: "auto",
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                  padding: "1rem 2rem",
                  borderRadius: "10px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                See more →
              </button>
            </div>
          </div>
        </div>

        {/* Small Product Card Example */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "200px",
              background: "#F5F5F5",
              borderRadius: "50%",
              marginBottom: "1.5rem",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=300"
              alt="Shoe"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </div>
          <h3
            style={{ fontSize: "1.25rem", fontWeight: 600, color: "#2C3E50" }}
          >
            Vintage Sneaker
          </h3>
          <p
            style={{
              color: "#777",
              fontSize: "0.9rem",
              margin: "0.5rem 0 1.5rem",
            }}
          >
            Giày chạy bộ cực kỳ thoải mái...
          </p>
          <button
            style={{
              width: "100%",
              background: "#4A7C9E",
              color: "white",
              border: "none",
              padding: "0.85rem",
              borderRadius: "10px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Find more
          </button>
        </div>
      </div>
    </section>
  );
};

const ProductCollection = () => (
  <section
    style={{
      padding: "4rem 2rem",
      background: "white",
      maxWidth: "1400px",
      margin: "0 auto",
    }}
  >
    <h2
      style={{
        fontSize: "2.5rem",
        fontWeight: 700,
        color: "#2C3E50",
        textAlign: "center",
        marginBottom: "3rem",
      }}
    >
      Graceful Steps Collection
    </h2>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1.5rem",
        autoRows: "300px",
      }}
    >
      {[
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400",
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400",
        "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400",
        "https://images.unsplash.com/photo-1584735175097-719d848f8449?w=600",
      ].map((img, i) => (
        <div
          key={i}
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            cursor: "pointer",
            gridColumn: i === 4 ? "span 2" : "span 1",
          }}
        >
          <img
            src={img}
            alt="Product"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s",
            }}
          />
        </div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer
    style={{
      background: "linear-gradient(135deg, #2C5F7C 0%, #567C8D 80%)",
      color: "white",
      padding: "4rem 2rem",
      marginTop: "5rem",
    }}
  >
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "3rem",
      }}
    >
      {/* Brand Col */}
      <div style={{ minWidth: "250px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "3px",
            }}
          >
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                style={{
                  width: "6px",
                  height: "6px",
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: "50%",
                }}
              ></span>
            ))}
          </div>
          <span style={{ fontWeight: 600, fontSize: "1.2rem" }}>
            brix templates
          </span>
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "0.9rem",
            lineHeight: "1.6",
            marginBottom: "1.5rem",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed mauris sed.
        </p>
        <div style={{ display: "flex", gap: "0.8rem" }}>
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map(
            (Icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  width: "36px",
                  height: "36px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <Icon size={16} />
              </a>
            )
          )}
        </div>
      </div>

      {/* Links Cols */}
      {[
        {
          title: "Product",
          links: ["Features", "Pricing", "Reviews", "Updates"],
        },
        { title: "Company", links: ["About", "Contact us", "Careers", "Blog"] },
        {
          title: "Support",
          links: ["Help center", "Report a bug", "Chat support"],
        },
      ].map((section, i) => (
        <div key={i}>
          <h4
            style={{
              marginBottom: "1.25rem",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            {section.title}
          </h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {section.links.map((link, j) => (
              <li key={j} style={{ marginBottom: "0.8rem" }}>
                <a
                  href="#"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div
      style={{
        textAlign: "center",
        marginTop: "4rem",
        paddingTop: "2rem",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.6)",
        fontSize: "0.85rem",
      }}
    >
      Copyright © 2023 BRIX Templates | All Rights Reserved
    </div>
  </footer>
);

// --- 2. MAIN PAGE COMPONENT ---

const HomePage = () => {
  // TỰ ĐỘNG ĐỔI TÊN TAB TRÌNH DUYỆT KHI VÀO TRANG HOME
  useEffect(() => {
    document.title = "SHATE - Homepage";
    // Cuộn lên đầu trang khi load trang
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: "linear-gradient(135deg, #DFE9F3 0%, #FFFFFF 100%)",
        minHeight: "100vh",
      }}
    >
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FlashSale />
        <ProductCollection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
