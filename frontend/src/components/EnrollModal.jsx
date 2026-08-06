import { useState, useEffect } from "react";

import "./EnrollModal.css";
import axios from "axios";

const EnrollModal = () => {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [findStudent, setFindStudent] = useState("");
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState(null);

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

  const findStudentInfo = async () => {
    try {
      const getStudent = await axios.get(
        `http://localhost:3000/students/${findStudent}`,
      );
      setStudent(getStudent.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderSearchBar = () => {
    return (
      <>
        <input
          className="input-style"
          type="text"
          placeholder="Enter StudentID"
          value={findStudent}
          onChange={(event) => setFindStudent(event.target.value)}
        />

        <button onClick={findStudentInfo}>Search</button>
      </>
    );
  };

  if (!student) {
    return (
      <>
        {renderSearchBar()}
        <p>Please input Student ID.</p>
      </>
    );
  }

  const enrolledSubjects = subjects.filter((subject) =>
    student.subjects.includes(subject.subjectId),
  );

  const handleSubject = async (subjectId) => {
    await axios.post(`http://localhost:3000/enroll/${student.studentId}`, {
      subjectId,
    });
    await findStudentInfo();
  };

  const dropSubject = async (subjectId) => {
    await axios.delete(`http://localhost:3000/enroll/${student.studentId}`, {
      data: {
        subjectId,
      },
    });
    await findStudentInfo();
  };

  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":");

    const convertHours = Number(hours) * 60;
    return convertHours + Number(minutes);
  };

  //conflict logic
  const conflictSched = (subject) => {
    const subjectSubjStart = convertToMinutes(subject.start);
    const subjectSubjEnd = convertToMinutes(subject.end);

    return enrolledSubjects.some((enrolledSubject) => {
      const enrolledSubjStart = convertToMinutes(enrolledSubject.start);
      const enrolledSubjEnd = convertToMinutes(enrolledSubject.end);

      return (
        subject.day === enrolledSubject.day &&
        subjectSubjStart < enrolledSubjEnd &&
        subjectSubjEnd > enrolledSubjStart
      );
    });
  };

  return (
    <>
      {renderSearchBar()}
      <div className="enroll">
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead>
              <tr className="bg-blue-200">
                <th className="py-2 text-left">ID</th>
                <th className="py-2 text-left">First Name</th>
                <th className="py-2 text-left">Last Name</th>
                <th className="py-2 text-left">Course</th>
                <th className="py-2 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{student.studentId}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedStudentId(student.studentId);
                      setShowModal(true);
                    }}
                  >
                    Enroll
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {showModal && (
          <div>
            <hr className="my-6" />
            <h2>Student Info</h2>
            <ul>
              <li>ID: {student.studentId}</li>
              <li>First Name: {student.firstName}</li>
              <li>Last Name: {student.lastName}</li>
              <li>Course: {student.course}</li>
            </ul>
            <hr className="my-6" />
            <div className="enroll-tables">
              <div className="table-card">
                <h2>Current Subjects</h2>

                <table className="subject-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Subject</th>
                      <th>Day</th>
                      <th>Time</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {enrolledSubjects.map((subject) => (
                      <tr key={subject.subjectId}>
                        <td>{subject.subjectId}</td>
                        <td>{subject.subjectName}</td>
                        <td>{subject.day}</td>
                        <td>
                          {subject.start} - {subject.end}
                        </td>

                        <td>
                          <button
                            onClick={() => dropSubject(subject.subjectId)}
                            className="delete-btn"
                          >
                            Drop
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-card">
                <h2>Available Subjects</h2>

                <table className="subject-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Subject</th>
                      <th>Day</th>
                      <th>Time</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {subjects.map((subject) => (
                      <tr key={subject.subjectId}>
                        <td>{subject.subjectId}</td>
                        <td>{subject.subjectName}</td>
                        <td>{subject.day}</td>
                        <td>
                          {subject.start} - {subject.end}
                        </td>

                        <td>
                          <button
                            disabled={conflictSched(subject)}
                            onClick={() => handleSubject(subject.subjectId)}
                            className="view-btn"
                          >
                            Enroll
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        )}
      </div>
    </>
  );
};

export default EnrollModal;
