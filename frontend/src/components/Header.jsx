import "../App.css";

import { Menu } from "lucide-react";

const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <header className="header">
      <button className="menu-btn" onClick={() => setShowSidebar(!showSidebar)}>
        <Menu size={20} />
      </button>
    </header>
  );
};

export default Header;
