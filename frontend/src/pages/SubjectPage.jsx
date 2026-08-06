import { useState, useEffect } from "react";
import SubjectModal from "../components/SubjectModal.jsx";
import ViewSubjectsModal from "../components/ViewSubjectsModal.jsx";
import EditSubjectModal from "../components/EditSubjectModal.jsx";
import axios from "axios";

const SubjectPage = () => {
  const [editSubjects, setEditSubjects] = useState(null);
  const [viewSubjects, setViewSubjects] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await axios.get("http://localhost:3000/students");
        setStudents(getData.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await axios.get("http://localhost:3000/subjects");
        setSubjects(getData.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const fetchSubjects = async () => {
    try {
      const getData = await axios.get("http://localhost:3000/subjects");
      setSubjects(getData.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const deleteSubjects = async (subjectId) => {
    await axios.delete(`http://localhost:3000/subjects/${subjectId}`);
    fetchSubjects();
  };

  const isEnrolled = (subjectId) =>
    students.some((student) => student.subjects.includes(subjectId));

  return (
    <>
      <div className="table-card">
        <div className="table-header">
          <div className="top-header">
            <h2>Subject List</h2>
            <p>Manage and view all subjects in the system.</p>
          </div>
          <div>
            <br />
            <SubjectModal refreshSubjects={fetchSubjects} />
          </div>
        </div>
        <br />
        <div className="overflow-x-auto">
          <table className="page-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Day</th>
                <th>Start</th>
                <th>End</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.subjectId}>
                  <td>{subject.subjectId}</td>
                  <td>{subject.subjectName}</td>
                  <td>{subject.day}</td>
                  <td>{subject.start}</td>
                  <td>{subject.end}</td>
                  <td className="action-buttons">
                    <button
                      onClick={() => {
                        setEditSubjects(subject);
                        setShowEditModal(true);
                      }}
                      className="view-btn"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setViewSubjects(subject.subjectId);
                        setShowModal(true);
                      }}
                      className="view-btn"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        if (isEnrolled(subject.subjectId)) {
                          alert(
                            "Please Drop all students before Deleting the subject",
                          );
                        } else {
                          deleteSubjects(subject.subjectId);
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

      {showModal && (
        <ViewSubjectsModal
          subjectId={viewSubjects}
          onClose={() => setShowModal(false)}
        />
      )}

      {showEditModal && (
        <EditSubjectModal
          subject={editSubjects}
          onClose={() => setShowModal(false)}
          refreshSubjects={fetchSubjects}
        />
      )}
    </>
  );
};
export default SubjectPage;
