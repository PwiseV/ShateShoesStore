import { useEffect } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Banner from "./components/Banner";
import StatsSection from "./components/StatsSection";
import FlashSale from "./components/Flashsale"
import Collection from "./components/Collection";

const HomePage = () => {
  useEffect(() => {
    document.title = "SHATE - Homepage";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        background: "#F5EFEB",
        borderRadius: "40px",
        minHeight: "100vh",
      }}
    >
      <Header />
        <Banner />
        <StatsSection />
        <FlashSale />
        <Collection />

      <Footer />
    </div>
  );
};

export default HomePage;
