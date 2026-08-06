import { useState } from "react";
import axios from "axios";
import "./Modal.css";
import "./StudentModal.css";

const EditStudentModal = ({ students, onClose, refreshStudents }) => {
  const [firstName, setFirstName] = useState(students.firstName);
  const [lastName, setLastName] = useState(students.lastName);
  const [course, setCourse] = useState(students.course);

  const updateStudent = async () => {
    await axios.put(`http://localhost:3000/students/${students.studentId}`, {
      firstName,
      lastName,
      course,
    });
    refreshStudents();
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateStudent();
            }}
          >
            <h2>Edit Student</h2>

            <div className="name-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Student First Name"
                  value={firstName}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^[A-Za-z\s]*$/.test(value)) {
                      setFirstName(value);
                    }
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Student Last Name"
                  value={lastName}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^[A-Za-z\s]*$/.test(value)) {
                      setLastName(value);
                    }
                  }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Course</label>

              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              >
                <option value="">Select Course</option>
                <option value="BSCS">BS Computer Science</option>
                <option value="BSIT">BS Information Technology</option>
                <option value="BSIS">BS Information Systems</option>
                <option value="BSN">BS Nursing</option>
              </select>
            </div>

            <div className="button-row">
              <button type="submit">Save</button>

              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditStudentModal;
