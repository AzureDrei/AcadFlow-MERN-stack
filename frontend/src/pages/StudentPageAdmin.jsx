import StudentModal from "../components/StudentModal.jsx";
import ViewStudentModal from "../components/ViewStudentModal.jsx";
import EditStudentModal from "../components/EditStudentModal.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const StudentPageAdmin = () => {
  const [viewStudents, setviewStudents] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewShowModal, setViewShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await axios.get(
          "https://acadflow-backend-zy4z.onrender.com/students",
        );
        setStudents(getData.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const fetchStudents = async () => {
    try {
      const getData = await axios.get(
        "https://acadflow-backend-zy4z.onrender.com/students",
      );
      setStudents(getData.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (studentId) => {
    await axios.delete(
      `https://acadflow-backend-zy4z.onrender.com/students/${studentId}`,
    );
    fetchStudents();
  };

  return (
    <>
      <div className="table-card">
        <div className="table-header">
          <div className="top-header">
            <h2>Student List</h2>
            <p>Manage and view all students in the system.</p>
          </div>

          <div>
            <br />
            <StudentModal
              editStudent={editStudent}
              refreshStudents={fetchStudents}
            />
          </div>
        </div>
        <br />
        <div className="overflow-x-auto">
          <table className="page-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Course</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
                  <td className="student-id">{student.studentId}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.course}</td>
                  <td className="action-buttons">
                    <button
                      className="view-btn"
                      onClick={() => {
                        setEditStudent(student);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setviewStudents(student.studentId);
                        setViewShowModal(true);
                      }}
                      className="view-btn"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        if (student.subjects.length > 0) {
                          alert(
                            "Please drop all of the students subjects before deleting",
                          );
                        } else {
                          deleteStudent(student.studentId);
                        }
                      }}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewShowModal && (
        <ViewStudentModal
          studentId={viewStudents}
          onClose={() => setViewShowModal(false)}
          refreshStudents={fetchStudents}
        />
      )}

      {showModal && (
        <EditStudentModal
          students={editStudent}
          onClose={() => setShowModal(false)}
          refreshStudents={fetchStudents}
        />
      )}
    </>
  );
};

export default StudentPageAdmin;
