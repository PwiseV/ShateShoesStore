import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import Header from "../../../components/Admin/Header";
import Footer from "../../../components/Admin/Footer";
import SideBar from "../../../components/Admin/SideBar";
import MainContent from "./components/MainContent";

const selectedMenu = "Tổng quan";

const Dashboard = () => {
  // const navigate = useNavigate();
  // const [selectedMenu, setSelectedMenu] = useState("Tổng quan");

  useEffect(() => {
    document.title = "SHATE - Dashboard";
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
      <div
        style={{
          maxWidth: "1200px",
          margin: "2rem auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "260px 1fr", 
          gap: "2rem",
          padding: "0 2rem", 
          boxSizing: "border-box",
        }}
      >
        <SideBar selectedMenu={selectedMenu} />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;