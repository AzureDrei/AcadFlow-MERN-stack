import { useState } from "react";
import axios from "axios";

const SubjectModal = ({ refreshSubjects }) => {
  const [showModal, setShowModal] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const addSubjectName = async () => {
    try {
      await axios.post("http://localhost:3000/subjects", {
        subjectName,
        day,
        start,
        end,
      });
      setSubjectName("");
      setDay("");
      setStart("");
      setEnd("");
      refreshSubjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="button-row-header">
        <button onClick={() => setShowModal(true)}>+ Add Subject</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addSubjectName();
              }}
            >
              <h2>Add Subject</h2>

              <div className="form-group">
                <label>Subject Name</label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Day</label>

                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              </div>

              <div className="time-row">
                <div className="form-group">
                  <label>Start Time</label>

                  <select
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    required
                  >
                    <option value="">Select Start Time</option>
                    <option value="8:00">8:00AM</option>
                    <option value="9:00">9:00AM</option>
                    <option value="10:00">10:00AM</option>
                    <option value="11:00">11:00AM</option>
                    <option value="12:00">12:00AM</option>
                    <option value="1:00">1:00PM</option>
                    <option value="2:00">2:00PM</option>
                    <option value="3:00">3:00PM</option>
                    <option value="4:00">4:00PM</option>
                    <option value="5:00">5:00PM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>End Time</label>

                  <select
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    required
                  >
                    <option value="">Select End Time</option>
                    <option value="8:00">8:00AM</option>
                    <option value="9:00">9:00AM</option>
                    <option value="10:00">10:00AM</option>
                    <option value="11:00">11:00AM</option>
                    <option value="12:00">12:00AM</option>
                    <option value="1:00">1:00PM</option>
                    <option value="2:00">2:00PM</option>
                    <option value="3:00">3:00PM</option>
                    <option value="4:00">4:00PM</option>
                    <option value="5:00">5:00PM</option>
                  </select>
                </div>
              </div>

              <div className="button-row">
                <button type="submit">Save</button>

                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectModal;
