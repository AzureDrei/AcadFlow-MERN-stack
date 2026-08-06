import { useState } from "react";
import axios from "axios";

const EditSubjectModal = ({ subject, onClose, refreshSubjects }) => {
  const [showModal, setShowModal] = useState(false);
  const [subjectName, setSubjectName] = useState(subject.subjectName);
  const [day, setDay] = useState(subject.day);
  const [start, setStart] = useState(subject.start);
  const [end, setEnd] = useState(subject.end);

  const updateSubject = async () => {
    await axios.put(`http://localhost:3000/subjects/${subject.subjectId}`, {
      subjectName,
      day,
      start,
      end,
    });
    refreshSubjects();
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateSubject();
            }}
          >
            <h2>Edit Subject</h2>

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
                  <option value="13:00">13:00PM</option>
                  <option value="14:00">14:00PM</option>
                  <option value="15:00">15:00PM</option>
                  <option value="16:00">16:00PM</option>
                  <option value="17:00">17:00PM</option>
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
                  <option value="13:00">13:00PM</option>
                  <option value="14:00">14:00PM</option>
                  <option value="15:00">15:00PM</option>
                  <option value="16:00">16:00PM</option>
                  <option value="17:00">17:00PM</option>
                </select>
              </div>
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

export default EditSubjectModal;
