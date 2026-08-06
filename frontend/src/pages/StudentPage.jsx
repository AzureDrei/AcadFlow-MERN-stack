import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import applogo from "../image/AcadFlow-icon.png";
import axios from "axios";
import "../components/ViewStudentModal.css";

const StudentPage = () => {
  const [subjects, setSubjects] = useState(null);
  const [student, setStudent] = useState(null);

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const getStudent = await axios.get(
          `http://localhost:3000/students/${studentId}`,
        );

        setStudent(getStudent.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, [studentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSubjects = await axios.get("http://localhost:3000/subjects");
        setSubjects(getSubjects.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  if (!student || !subjects) {
    return <div>Loading...</div>;
  }

  const initials = student.firstName.charAt(0) + student.lastName.charAt(0);
  const enrolledSubjects = subjects.filter((subject) =>
    student.subjects.includes(subject.subjectId),
  );

  return (
    <>
      <div className="layout">
        <h2>Student Info</h2>
        <div className="top-content">
          <div className="student-avatar-modal">{initials}</div>
          <ul>
            <li className="name">
              {student.firstName} {student.lastName}
            </li>
            <li>ID: {student.studentId}</li>
            <li>Course: {student.course}</li>
          </ul>
        </div>
        <br />
        <h2>Current Subjects</h2>
        <div className="overflow-x-auto">
          <table className="page-table">
            <thead>
              <tr className="bg-blue-200">
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Subject</th>
                <th className="px-3 py-2 text-left">Day</th>
                <th className="px-3 py-2 text-left">Start</th>
                <th className="px-3 py-2 text-left">End</th>
              </tr>
            </thead>

            <tbody>
              {enrolledSubjects.map((enrolledsubject) => {
                return (
                  <tr key={enrolledsubject.subjectId}>
                    <td className="px-3 py-2">{enrolledsubject.subjectId}</td>
                    <td className="px-3 py-2">{enrolledsubject.subjectName}</td>
                    <td className="px-3 py-2">{enrolledsubject.day}</td>
                    <td className="px-3 py-2">{enrolledsubject.start}</td>
                    <td className="px-3 py-2">{enrolledsubject.end}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ul>
          <li className="bottom-item-student">
            <Link to="/">Back to Home</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default StudentPage;
