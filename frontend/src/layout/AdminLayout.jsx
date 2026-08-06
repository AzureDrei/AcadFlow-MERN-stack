import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      className="page"
      style={{
        gridTemplateColumns: isMobile
          ? "1fr"
          : showSidebar
            ? "280px 1fr"
            : "1fr",
      }}
    >
      {!isMobile && showSidebar && (
        <aside className="sidebar">
          <Sidebar />
        </aside>
      )}

      <main className="main-content">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        {isMobile && showSidebar && <Sidebar />}

        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
