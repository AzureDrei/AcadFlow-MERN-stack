import { Link } from "react-router-dom";
import "./HomePage.css";
import applogo from "../image/AcadFlow-icon.png";

const HomePage = () => {
  return (
    <>
      <div className="page-layout">
        <div className="first-col">
          <div className="title-container">
            <h1 className="title">Welcome to</h1>
            <img src={applogo} className="applogo" alt="Application Logo" />
          </div>

          <p>
            Welcome to AcadFlow, a student enrollment management system designed
            to simplify course registration, schedule management, and subject
            tracking.
          </p>
          <br />
          <ul className="button">
            <li className="button-1">
              <Link to="/student">Students Page</Link>
            </li>

            <li className="button-2">
              <Link to="/admin-home">Admin Page</Link>
            </li>
          </ul>
        </div>
        <div className="second-col">
          <p>wadwadsawdwa</p>
        </div>
      </div>
    </>
  );
};
export default HomePage;
