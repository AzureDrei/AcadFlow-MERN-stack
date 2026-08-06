import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  House,
  FileText,
} from "lucide-react";

import { Link } from "react-router-dom";
import applogo from "../image/AcadFlow-white.png";
import "./Sidebar.css";

const Sidebar = ({ collapsed }) => {
  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <div className="sidebar-content">
        <img src={applogo} alt="Application Logo" width="150" />
        <h2>Enrollment System</h2>
        <nav>
          <ul>
            <li className="sidebar-li">
              <Link to="/admin-home">
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link to="/student-admin">
                <Users size={20} />
                <span>Students</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link to="/subject">
                <BookOpen size={20} />
                <span>Subjects</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link to="/enroll">
                <GraduationCap size={20} />
                <span>Enrollment</span>
              </Link>
            </li>

            <li className="sidebar-li">
              <Link to="/aireport">
                <FileText size={20} />
                <span>Report</span>
              </Link>
            </li>

            <li className="bottom-item">
              <hr className="my-6 border-gray-600" />
              <br />
              <Link to="/">
                <House size={20} />
                <span>Back to Home</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
