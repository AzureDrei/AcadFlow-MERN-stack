import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import applogo from "../image/AcadFlow-icon.png";

import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login clicked");

    const response = await axios.post("http://localhost:3000/login", {
      username,
      password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("studentId", response.data.studentId);
    localStorage.setItem("role", response.data.role);

    // Redirect
    if (response.data.role === "admin") {
      navigate("/admin-home");
    } else {
      navigate("/student");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src={applogo} width={200}></img>
        </div>
        <h1>Enrollment System</h1>
        <br />
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username / Student ID</label>
            <input
              type="text"
              placeholder="Enter Username or Student ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
