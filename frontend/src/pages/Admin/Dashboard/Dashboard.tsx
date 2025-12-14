import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import Header from "../../../components/Customer/Header";
import Footer from "../../../components/Customer/Footer";
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

//  <main>
//           <h1
//             style={{
//               fontSize: "1.5rem",
//               fontWeight: 700,
//               color: "#5D7285",
//               marginBottom: "1.5rem",
//             }}
//           >
//             {selectedMenu}
//           </h1>

//           {/* Grid Layout cho các Widgets */}
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1.4fr 1fr",
//               gap: "1.5rem",
//             }}
//           >
//             {/* 1. OVERVIEW CARD (Có nền xám bao quanh) */}
//             <div
//               style={{
//                 background: "#92A3B0",
//                 borderRadius: "20px",
//                 padding: "1.5rem",
//                 color: "#2D3748",
//               }}
//             >
//               <h3
//                 style={{
//                   fontSize: "1rem",
//                   fontWeight: 700,
//                   marginBottom: "1rem",
//                   color: "white",
//                 }}
//               >
//                 Overview
//               </h3>

//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   borderRadius: "16px",
//                   overflow: "hidden",
//                   marginBottom: "1.5rem",
//                 }}
//               >
//                 {/* Customers Widget */}
//                 <div
//                   style={{
//                     background: "#E6D5D0",
//                     padding: "1.5rem",
//                     position: "relative",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "0.5rem",
//                       marginBottom: "0.5rem",
//                     }}
//                   >
//                     <FaUsers />{" "}
//                     <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
//                       Customers
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "2.5rem",
//                       fontWeight: 700,
//                       lineHeight: 1,
//                     }}
//                   >
//                     1,337
//                   </div>
//                   <div
//                     style={{
//                       marginTop: "1rem",
//                       fontSize: "0.75rem",
//                       textAlign: "right",
//                     }}
//                   >
//                     <span
//                       style={{
//                         background: "#F8B4B4",
//                         padding: "2px 6px",
//                         borderRadius: "4px",
//                         fontWeight: "bold",
//                         color: "#8B0000",
//                       }}
//                     >
//                       ↓ 30.8%
//                     </span>
//                     <div style={{ marginTop: "2px", opacity: 0.7 }}>
//                       vs last month
//                     </div>
//                   </div>
//                 </div>
//                 {/* Balance Widget */}
//                 <div
//                   style={{
//                     background: "#F2F2E8",
//                     padding: "1.5rem",
//                     position: "relative",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "0.5rem",
//                       marginBottom: "0.5rem",
//                     }}
//                   >
//                     <FaWallet />{" "}
//                     <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
//                       Balance
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       fontSize: "2.5rem",
//                       fontWeight: 700,
//                       lineHeight: 1,
//                     }}
//                   >
//                     256k
//                   </div>
//                   <div
//                     style={{
//                       marginTop: "1rem",
//                       fontSize: "0.75rem",
//                       textAlign: "right",
//                     }}
//                   >
//                     <span
//                       style={{
//                         background: "#B3E5B3",
//                         padding: "2px 6px",
//                         borderRadius: "4px",
//                         fontWeight: "bold",
//                         color: "#006400",
//                       }}
//                     >
//                       ↑ 15.6%
//                     </span>
//                     <div style={{ marginTop: "2px", opacity: 0.7 }}>
//                       vs last month
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* New Customers Section */}
//               <div
//                 style={{
//                   background: "rgba(255,255,255,0.5)",
//                   padding: "1rem",
//                   borderRadius: "12px",
//                 }}
//               >
//                 <h4
//                   style={{
//                     fontSize: "0.9rem",
//                     fontWeight: 700,
//                     marginBottom: "0.3rem",
//                   }}
//                 >
//                   36 new customers today!
//                 </h4>
//                 <div
//                   style={{
//                     display: "flex",
//                     gap: "0.5rem",
//                     alignItems: "center",
//                     marginTop: "0.8rem",
//                   }}
//                 >
//                   {[1, 2, 3, 4].map((u) => (
//                     <div
//                       key={u}
//                       style={{
//                         width: "35px",
//                         height: "35px",
//                         borderRadius: "50%",
//                         background: "#CBD5E0",
//                         border: "2px solid white",
//                       }}
//                     ></div>
//                   ))}
//                   <button
//                     style={{
//                       width: "35px",
//                       height: "35px",
//                       borderRadius: "50%",
//                       border: "none",
//                       background: "white",
//                       cursor: "pointer",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <FaArrowRight size={12} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* 2. POPULAR PRODUCTS */}
//             <div
//               style={{
//                 background: "#E8EEF2",
//                 borderRadius: "20px",
//                 padding: "1.5rem",
//               }}
//             >
//               <h3
//                 style={{
//                   fontSize: "1rem",
//                   fontWeight: 700,
//                   marginBottom: "1rem",
//                 }}
//               >
//                 Popular Products
//               </h3>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "0.8rem",
//                 }}
//               >
//                 {[1, 2, 3, 4].map((item) => (
//                   <div
//                     key={item}
//                     style={{
//                       background: "white",
//                       padding: "0.6rem",
//                       borderRadius: "8px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       border: "1px solid #E2E8F0",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "0.8rem",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "30px",
//                           height: "30px",
//                           borderRadius: "50%",
//                           background: "#E2E8F0",
//                         }}
//                       ></div>
//                       <div>
//                         <div
//                           style={{ fontSize: "0.75rem", fontWeight: "bold" }}
//                         >
//                           Tên sản phẩm
//                         </div>
//                       </div>
//                     </div>
//                     <div style={{ textAlign: "right" }}>
//                       <div style={{ fontSize: "0.7rem", fontWeight: "bold" }}>
//                         $99
//                       </div>
//                       <div
//                         style={{
//                           background: "#C6F6D5",
//                           padding: "1px 5px",
//                           borderRadius: "4px",
//                           fontSize: "0.6rem",
//                           fontWeight: "bold",
//                           color: "#22543D",
//                         }}
//                       >
//                         Stock
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button
//                 style={{
//                   width: "100%",
//                   padding: "0.6rem",
//                   marginTop: "1rem",
//                   borderRadius: "20px",
//                   border: "1px solid #2C3E50",
//                   background: "transparent",
//                   fontWeight: "bold",
//                   fontSize: "0.8rem",
//                   cursor: "pointer",
//                 }}
//               >
//                 All products
//               </button>
//             </div>

//             {/* 3. PRODUCT VIEW (CHART) */}
//             <div
//               style={{
//                 background: "#F7F3F0",
//                 borderRadius: "20px",
//                 padding: "1.5rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>
//                   Product view
//                 </h3>
//                 <span
//                   style={{
//                     background: "#C4A4A4",
//                     padding: "4px 10px",
//                     borderRadius: "15px",
//                     fontSize: "0.65rem",
//                     color: "white",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   Last 7 days
//                 </span>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-end",
//                   gap: "12px",
//                   height: "120px",
//                 }}
//               >
//                 {[30, 50, 80, 20, 100, 40, 60].map((h, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       flex: 1,
//                       height: "100%",
//                       display: "flex",
//                       alignItems: "flex-end",
//                       flexDirection: "column",
//                       justifyContent: "flex-end",
//                     }}
//                   >
//                     {/* Fake chart bars */}
//                     <div
//                       style={{
//                         width: "100%",
//                         height: `${h}%`,
//                         background: i === 4 ? "#10B981" : "#D1D5DB",
//                         borderRadius: "4px 4px 0 0",
//                         position: "relative",
//                       }}
//                     >
//                       {i === 4 && (
//                         <span
//                           style={{
//                             position: "absolute",
//                             top: "-20px",
//                             left: "50%",
//                             transform: "translateX(-50%)",
//                             fontSize: "0.7rem",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           2.2m
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div
//                 style={{
//                   fontSize: "1.8rem",
//                   fontWeight: "700",
//                   marginTop: "1rem",
//                 }}
//               >
//                 $ 10.2m
//               </div>
//             </div>

//             {/* 4. COMMENT */}
//             <div
//               style={{
//                 background: "#E8EEF2",
//                 borderRadius: "20px",
//                 padding: "1.5rem",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//               }}
//             >
//               <h3
//                 style={{
//                   fontSize: "1rem",
//                   fontWeight: 700,
//                   marginBottom: "1rem",
//                 }}
//               >
//                 Comment
//               </h3>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "1rem",
//                 }}
//               >
//                 {[1, 2].map((i) => (
//                   <div key={i} style={{ display: "flex", gap: "0.8rem" }}>
//                     <div
//                       style={{
//                         width: "30px",
//                         height: "30px",
//                         borderRadius: "50%",
//                         background: "#CBD5E0",
//                       }}
//                     ></div>
//                     <div style={{ flex: 1 }}>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           fontSize: "0.7rem",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         <span>User{i}</span>
//                         <span style={{ opacity: 0.6 }}>10m</span>
//                       </div>
//                       <div
//                         style={{
//                           fontSize: "0.65rem",
//                           marginTop: "2px",
//                           color: "#4A5568",
//                         }}
//                       >
//                         Great product! Loved it.
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div style={{ textAlign: "right", marginTop: "1rem" }}>
//                 <button
//                   style={{
//                     background: "#D3C4BE",
//                     border: "none",
//                     padding: "6px 16px",
//                     borderRadius: "15px",
//                     fontSize: "0.7rem",
//                     fontWeight: "bold",
//                     cursor: "pointer",
//                     color: "#2D3748",
//                   }}
//                 >
//                   More →
//                 </button>
//               </div>
//             </div>
//           </div>
//         </main>