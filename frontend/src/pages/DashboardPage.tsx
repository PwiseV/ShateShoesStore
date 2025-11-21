import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaShoppingCart,
  FaUser,
  FaArrowRight,
  FaSignOutAlt,
  FaWallet,
  FaUsers,
} from "react-icons/fa";
// Nhớ thay đổi đường dẫn logo cho đúng với folder của bạn
import logoImg from "../assets/logo3.svg";

// --- 1. HEADER (Giữ nguyên từ Homepage) ---
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
    {/* --- PHẦN LOGO + CHỮ --- */}
    <Link
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.8rem", // Khoảng cách giữa Logo và chữ
        textDecoration: "none",
        color: "#334E68",
      }}
    >
      {/* 1. Ảnh Logo */}
      <img src={logoImg} alt="Logo" style={{ height: "45px", width: "auto" }} />

      {/* 2. Chữ SHATE bên cạnh */}
      <span
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          letterSpacing: "6px",
          fontFamily: "sans-serif",
          color: "#567C8D",
        }}
      >
        SHATE
      </span>
    </Link>

    {/* --- MENU --- */}
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

    {/* --- ICONS --- */}
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

// --- 2. FOOTER (Giữ nguyên từ Homepage) ---
const Footer = () => (
  <footer
    style={{
      background: "linear-gradient(135deg, #2C5F7C 0%, #567C8D 80%)",
      color: "white",
      padding: "4rem 2rem",
      marginTop: "auto", // Quan trọng: Đẩy footer xuống đáy màn hình
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

// --- 3. DASHBOARD COMPONENT ---

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("Tổng quan");

  useEffect(() => {
    document.title = "SHATE - Dashboard";
    window.scrollTo(0, 0);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: "#FDFBF7", // Màu nền kem nhẹ toàn trang
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      {/* CONTAINER CHÍNH: Chứa Sidebar và Main Content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "2rem auto",
          width: "100%",
          flex: 1, // Để nội dung giãn ra đẩy footer xuống
          display: "grid",
          gridTemplateColumns: "260px 1fr", // Chia cột: Sidebar cố định 260px, còn lại là content
          gap: "2rem",
          padding: "0 2rem", // Padding 2 bên để không dính mép khi màn hình nhỏ
          boxSizing: "border-box",
        }}
      >
        {/* --- SIDEBAR (Màu xanh đậm) --- */}
        <aside
          style={{
            background: "#2C3E50",
            borderRadius: "20px",
            padding: "2rem 1.5rem",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "calc(100vh - 150px)", // Chiều cao tự động tính toán để đẹp mắt
            position: "sticky",
            top: "100px", // Cách top để không bị Header che
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#F1C40F", // Màu vàng nổi bật
                marginBottom: "2.5rem",
                paddingLeft: "0.5rem",
              }}
            >
              Tổng quan
            </h2>

            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {[
                "Quản lý người dùng",
                "Quản lý sản phẩm",
                "Quản lý đơn hàng",
                "Quản lý khuyến mãi",
                "Quản lý bài viết",
                "Quản lý đánh giá",
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedMenu(item)}
                  style={{
                    background:
                      selectedMenu === item
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                    border: "none",
                    color: "white",
                    padding: "0.8rem 1rem",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    borderRadius: "8px",
                    transition: "all 0.2s",
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={handleSignOut}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              padding: "0.8rem",
              cursor: "pointer",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "2rem",
            }}
          >
            <FaSignOutAlt /> Sign out
          </button>
        </aside>

        {/* --- MAIN DASHBOARD CONTENT --- */}
        <main>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#5D7285",
              marginBottom: "1.5rem",
            }}
          >
            {selectedMenu}
          </h1>

          {/* Grid Layout cho các Widgets */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: "1.5rem",
            }}
          >
            {/* 1. OVERVIEW CARD (Có nền xám bao quanh) */}
            <div
              style={{
                background: "#92A3B0",
                borderRadius: "20px",
                padding: "1.5rem",
                color: "#2D3748",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  color: "white",
                }}
              >
                Overview
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  borderRadius: "16px",
                  overflow: "hidden",
                  marginBottom: "1.5rem",
                }}
              >
                {/* Customers Widget */}
                <div
                  style={{
                    background: "#E6D5D0",
                    padding: "1.5rem",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <FaUsers />{" "}
                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      Customers
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    1,337
                  </div>
                  <div
                    style={{
                      marginTop: "1rem",
                      fontSize: "0.75rem",
                      textAlign: "right",
                    }}
                  >
                    <span
                      style={{
                        background: "#F8B4B4",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        color: "#8B0000",
                      }}
                    >
                      ↓ 30.8%
                    </span>
                    <div style={{ marginTop: "2px", opacity: 0.7 }}>
                      vs last month
                    </div>
                  </div>
                </div>
                {/* Balance Widget */}
                <div
                  style={{
                    background: "#F2F2E8",
                    padding: "1.5rem",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <FaWallet />{" "}
                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      Balance
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    256k
                  </div>
                  <div
                    style={{
                      marginTop: "1rem",
                      fontSize: "0.75rem",
                      textAlign: "right",
                    }}
                  >
                    <span
                      style={{
                        background: "#B3E5B3",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        color: "#006400",
                      }}
                    >
                      ↑ 15.6%
                    </span>
                    <div style={{ marginTop: "2px", opacity: 0.7 }}>
                      vs last month
                    </div>
                  </div>
                </div>
              </div>

              {/* New Customers Section */}
              <div
                style={{
                  background: "rgba(255,255,255,0.5)",
                  padding: "1rem",
                  borderRadius: "12px",
                }}
              >
                <h4
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    marginBottom: "0.3rem",
                  }}
                >
                  36 new customers today!
                </h4>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    marginTop: "0.8rem",
                  }}
                >
                  {[1, 2, 3, 4].map((u) => (
                    <div
                      key={u}
                      style={{
                        width: "35px",
                        height: "35px",
                        borderRadius: "50%",
                        background: "#CBD5E0",
                        border: "2px solid white",
                      }}
                    ></div>
                  ))}
                  <button
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "none",
                      background: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. POPULAR PRODUCTS */}
            <div
              style={{
                background: "#E8EEF2",
                borderRadius: "20px",
                padding: "1.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                Popular Products
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    style={{
                      background: "white",
                      padding: "0.6rem",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.8rem",
                      }}
                    >
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          background: "#E2E8F0",
                        }}
                      ></div>
                      <div>
                        <div
                          style={{ fontSize: "0.75rem", fontWeight: "bold" }}
                        >
                          Tên sản phẩm
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
                        $99
                      </div>
                      <div
                        style={{
                          background: "#C6F6D5",
                          padding: "1px 5px",
                          borderRadius: "4px",
                          fontSize: "0.6rem",
                          fontWeight: "bold",
                          color: "#22543D",
                        }}
                      >
                        Stock
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  marginTop: "1rem",
                  borderRadius: "20px",
                  border: "1px solid #2C3E50",
                  background: "transparent",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                All products
              </button>
            </div>

            {/* 3. PRODUCT VIEW (CHART) */}
            <div
              style={{
                background: "#F7F3F0",
                borderRadius: "20px",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>
                  Product view
                </h3>
                <span
                  style={{
                    background: "#C4A4A4",
                    padding: "4px 10px",
                    borderRadius: "15px",
                    fontSize: "0.65rem",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Last 7 days
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "12px",
                  height: "120px",
                }}
              >
                {[30, 50, 80, 20, 100, 40, 60].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: "100%",
                      display: "flex",
                      alignItems: "flex-end",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* Fake chart bars */}
                    <div
                      style={{
                        width: "100%",
                        height: `${h}%`,
                        background: i === 4 ? "#10B981" : "#D1D5DB",
                        borderRadius: "4px 4px 0 0",
                        position: "relative",
                      }}
                    >
                      {i === 4 && (
                        <span
                          style={{
                            position: "absolute",
                            top: "-20px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontSize: "0.7rem",
                            fontWeight: "bold",
                          }}
                        >
                          2.2m
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  marginTop: "1rem",
                }}
              >
                $ 10.2m
              </div>
            </div>

            {/* 4. COMMENT */}
            <div
              style={{
                background: "#E8EEF2",
                borderRadius: "20px",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                Comment
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[1, 2].map((i) => (
                  <div key={i} style={{ display: "flex", gap: "0.8rem" }}>
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: "#CBD5E0",
                      }}
                    ></div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.7rem",
                          fontWeight: "bold",
                        }}
                      >
                        <span>User{i}</span>
                        <span style={{ opacity: 0.6 }}>10m</span>
                      </div>
                      <div
                        style={{
                          fontSize: "0.65rem",
                          marginTop: "2px",
                          color: "#4A5568",
                        }}
                      >
                        Great product! Loved it.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "right", marginTop: "1rem" }}>
                <button
                  style={{
                    background: "#D3C4BE",
                    border: "none",
                    padding: "6px 16px",
                    borderRadius: "15px",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    color: "#2D3748",
                  }}
                >
                  More →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
