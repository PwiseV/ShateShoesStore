import React, { useEffect } from "react";
import Header from "../../../../components/Customer/Header";
import Footer from "../../../../components/Customer/Footer";
import AboutHero from "./components/AboutHero";
import StorySection from "./components/StorySection";
import MilestoneSection from "./components/MilestoneSection";

const AboutUs: React.FC = () => {
  useEffect(() => {
    document.title = "SHATE - Về chúng tôi";
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

      <div style={{ flex: 1 }}>
        <AboutHero />
        <StorySection />
        <MilestoneSection />
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
