import React from "react";

const AboutHero: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        backgroundImage: "url('/imgs/cover-image-about-us.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      />

      <h1
        style={{
          position: "relative",
          zIndex: 1,
          fontSize: "3rem",
          fontWeight: 800,
          lineHeight: 1.2,
          textTransform: "uppercase",
          letterSpacing: "1px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Find your shoe <br /> with us & <br /> feel the comfort
      </h1>
    </div>
  );
};

export default AboutHero;
