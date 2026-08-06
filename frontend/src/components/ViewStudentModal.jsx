import { useState, useEffect } from "react";
import "./ViewStudentModal.css";
import axios from "axios";

const ViewStudentModal = ({ studentId, onClose, refreshStudents }) => {
  const [subjects, setSubjects] = useState(null);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const getStudent = await axios.get(
          `https://acadflow-backend-zy4z.onrender.com/students/${studentId}`,
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
        const getSubjects = await axios.get(
          "https://acadflow-backend-zy4z.onrender.com/subjects",
        );
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

  const dropSubject = async (subjectId) => {
    await axios.delete(
      `https://acadflow-backend-zy4z.onrender.com/enroll/${student.studentId}`,
      {
        data: {
          subjectId,
        },
      },
    );
    refreshStudents();
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <h2>Student Info:</h2>
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
          <hr className="my-6" />
          <br />
          <h2>Current Subjects</h2>
          <div className="overflow-x-auto">
            <div className="table-container">
              <table className="page-table">
                <thead>
                  <tr>
                    <th>Subject ID</th>
                    <th>Subject Name</th>
                    <th>Schedule</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {enrolledSubjects.map((subject) => (
                    <tr key={subject.subjectId}>
                      <td className="student-id">{subject.subjectId}</td>

                      <td>{subject.subjectName}</td>

                      <td>
                        <span className="day">{subject.day}</span>
                        {subject.start} - {subject.end}
                      </td>

                      <td className="action-buttons">
                        <button
                          className="delete-btn"
                          onClick={() => dropSubject(subject.subjectId)}
                        >
                          Drop Subject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStudentModal;
