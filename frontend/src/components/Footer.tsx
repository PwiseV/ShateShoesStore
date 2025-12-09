import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logoImg from "../assets/logo3.svg";

const Footer = () => {
  return (
    <div>
      <footer
        style={{
          background: "linear-gradient(135deg, #2C5F7C 0%, #567C8D 80%)",
          color: "white",
          padding: "2rem 2rem",
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
          <div style={{ minWidth: "300px" }}>
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
                  gap: "3px",
                }}
              >
                <Box
                  component="img"
                  src={logoImg}
                  alt="SHATE logo"
                  sx={{ height: 40, width: "auto" }}
                />
              </div>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "9px",
                  alignItems: "center",
                  marginTop: "3px",
                }}
              >
                SHATE
              </Typography>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1rem",
                lineHeight: "1.6",
                marginBottom: "1.5rem",
                textAlign: "left"

              }}
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed mauris
              sed.
            </p>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              {[
                FaFacebookF,
                FaTwitter,
                FaInstagram,
                FaLinkedinIn,
                FaYoutube,
              ].map((Icon, i) => (
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
              ))}
            </div>
          </div>

          {/* Links Cols */}
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Reviews", "Updates"],
            },
            {
              title: "Company",
              links: ["About", "Contact us", "Careers", "Blog"],
            },
            {
              title: "Support",
              links: ["Help center", "Report a bug", "Chat support"],
            }
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
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.85rem",
          }}
        >
          Copyright © 2023 BRIX Templates | All Rights Reserved
        </div>
      </footer>
    </div>
  );
};
export default Footer;
