import EnrollModal from "./components/EnrollModal.jsx";
import AdminPage from "../src/pages/AdminPage.jsx";
import { Routes, Route } from "react-router-dom";
import SubjectPage from "./pages/SubjectPage.jsx";
import StudentPageAdmin from "./pages/StudentPageAdmin.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import AdminLayout from "./layout/AdminLayout";
import LoginPage from "./pages/LoginPage.jsx";
import AIReportPage from "./pages/AIReportPage.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import "./App.css";

const App = () => {
  const students = useSelector((state) => state.students);
  const subjects = useSelector((state) => state.subjects);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student" element={<StudentPage />} />

        <Route element={<AdminLayout />}>
          <Route path="/student-admin" element={<StudentPageAdmin />} />
          <Route path="/enroll" element={<EnrollModal />} />
          <Route path="/admin-home" element={<AdminPage />} />
          <Route path="/subject" element={<SubjectPage />} />
          <Route path="/aireport" element={<AIReportPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
