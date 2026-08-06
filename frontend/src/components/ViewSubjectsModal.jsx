import { useState, useEffect } from "react";
import axios from "axios";

const ViewSubjectsModal = ({ subjectId, onClose }) => {
  const [subject, setSubject] = useState(null);
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getSubjects = await axios.get(
          `https://acadflow-backend-zy4z.onrender.com/subjects/${subjectId}`,
        );
        setSubject(getSubjects.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [subjectId]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const getStudent = await axios.get(
          `https://acadflow-backend-zy4z.onrender.com/students/`,
        );

        console.log(getStudent.data);
        setStudents(getStudent.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, []);

  if (!students || !subject) {
    return <div>Loading...</div>;
  }

  const enrolledStudents = students.filter((student) =>
    student.subjects.includes(subjectId),
  );

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <h2>Subject:</h2>
          <h2>
            {subject.subjectId} - {subject.subjectName}
          </h2>
          <p>
            {subject.day} • {subject.start} - {subject.end}
          </p>
          <br />
          <hr className="my-6" />
          <br />
          <div className="table-container">
            <h2>Enrolled Students</h2>

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
                  {enrolledStudents.map((student) => (
                    <tr key={student.studentId}>
                      <td>{student.studentId}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.course}</td>

                      <td className="action-buttons">
                        {/* <button
                          className="delete-btn"
                          onClick={() => handleStudent(student.id)}
                        >
                          Drop Student
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default ViewSubjectsModal;
