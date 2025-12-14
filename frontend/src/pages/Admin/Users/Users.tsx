import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
import SideBar from "../../../components/Admin/SideBar";
const selectedMenu = "Quản lý người dùng";

const Users = () => {
  // const navigate = useNavigate();
  useEffect(() => {
    document.title = "SHATE - Users Management";
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

      {/* CONTAINER CHÍNH: Chứa Sidebar và Main Content */}
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
        
        <main>
            <h1>Quản lý người dùng</h1>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Users;
