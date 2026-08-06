import { useState, useEffect } from "react";
import "./AdminPage.css";
import { Users, BookOpen } from "lucide-react";
import axios from "axios";

const AdminPage = () => {
  const [students, setStudents] = useState(null);
  const [subjects, setSubjects] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const getStudent = await axios.get(
          `https://acadflow-backend-zy4z.onrender.com/students/`,
        );

        setStudents(getStudent.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, []);

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

  if (!students || !subjects) {
    return <div>Loading...</div>;
  }

  const colors = ["#DBEAFE", "#DCFCE7", "#FCE7F3", "#FEF3C7", "#EDE9FE"];

  return (
    <>
      <div className="dashboard">
        {/* ===== Statistics ===== */}

        <div className="welcome-banner">
          <div>
            <p>Welcome back, Admin.</p>
            <span>
              Manage your students, subjects and enrollments efficiently.
            </span>
          </div>
        </div>

        <div className="dashboard-row">
          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon">
                <Users size={34} />
              </div>

              <div>
                <p>Students</p>
                <h2>{students.length}</h2>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <div className="stat-icon-subject">
                <BookOpen size={34} />
              </div>

              <div>
                <p>Subjects</p>
                <h2>{subjects.length}</h2>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h2>New Students</h2>

              <button>View All</button>
            </div>

            <div className="card-body">
              {students
                .slice(-3)
                .reverse()
                .map((student, index) => {
                  const initials =
                    student.firstName.charAt(0) + student.lastName.charAt(0);
                  return (
                    <div className="student-item" key={student.studentId}>
                      <div className="student-left">
                        <div
                          className="student-avatar"
                          style={{
                            backgroundColor: colors[index % colors.length],
                          }}
                        >
                          {initials}
                        </div>

                        <div>
                          <h3>
                            {student.firstName} {student.lastName}
                          </h3>

                          <p>{student.course}</p>
                        </div>
                      </div>

                      <span>{student.studentId}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT */}

          <div className="dashboard-card">
            <div className="card-header">
              <h2>Recently Added Subjects</h2>

              <button>View All</button>
            </div>

            <div className="card-body">
              {subjects
                .slice(-3)
                .reverse()
                .map((subject) => (
                  <div className="subject-item" key={subject.subjectId}>
                    <div>
                      <h3>{subject.subjectName}</h3>

                      <p>
                        <span className="day">{subject.day}</span>
                        {subject.start} - {subject.end}
                      </p>
                    </div>

                    <span>{subject.subjectId}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
