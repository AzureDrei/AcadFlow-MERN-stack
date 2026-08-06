import { useState } from "react";
import axios from "axios";
import "./Loader.css";
import "./AIReportPage.css";

const AIReportPage = () => {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://acadflow-backend-zy4z.onrender.com/aireport",
      );

      setReport(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(report);

  return (
    <div className="layout">
      <h2>AI Enrollment Report</h2>

      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
          <div>Loading...</div>
        </div>
      ) : (
        report && (
          <div className="report-container">
            <div className="report-card">
              <h3>Enrollment Summary</h3>
              <p>{report.summary}</p>
            </div>

            <div className="report-grid">
              <div className="report-card">
                <h3>Total Students</h3>
                <h2>{report.totalStudents}</h2>
              </div>

              <div className="report-card">
                <h3>Total Subjects</h3>
                <h2>{report.totalSubjects}</h2>
              </div>

              <div className="report-card">
                <h3>Most Enrolled Subject</h3>
                <p>{report.mostEnrolledSubject.name}</p>
                <span>{report.mostEnrolledSubject.students} Students</span>
              </div>

              <div className="report-card">
                <h3>Least Enrolled Subject</h3>
                <p>{report.leastEnrolledSubject.name}</p>
                <span>{report.leastEnrolledSubject.students} Students</span>
              </div>
            </div>

            <div className="report-card">
              <h3>AI Recommendations</h3>
              <ul>
                {report.recommendations.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )
      )}
      <button onClick={generateReport}>Generate Report</button>
    </div>
  );
};

export default AIReportPage;
