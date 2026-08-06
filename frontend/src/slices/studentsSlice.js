import { createSlice } from "@reduxjs/toolkit";

const studentNames = [
  {
    id: 2026001,
    firstName: "Maria",
    lastName: "Shein",
    course: "BSCS",
    subjects: [],
  },
  {
    id: 2026002,
    firstName: "Black",
    lastName: "Jack",
    course: "BSN",
    subjects: [],
  },
  {
    id: 2026003,
    firstName: "May",
    lastName: "Raine",
    course: "BS Arch",
    subjects: [],
  },
];
const newId = (state) => {
  return state.length === 0 ? 226001 : state[state.length - 1].id + 1;
};
const savedStudents = localStorage.getItem("students");

const initialState = savedStudents ? JSON.parse(savedStudents) : studentNames;

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      const newStudent = {
        id: newId(state),
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        course: action.payload.course,
        subjects: [],
      };
      state.push(newStudent);
    },

    deleteStudent: (state, action) => {
      return state.filter((student) => student.id !== action.payload);
    },

    enrollSubject: (state, action) => {
      const { studentId, subjectId } = action.payload;

      const student = state.find((student) => student.id === studentId);

      student.subjects.push(subjectId);
    },

    dropStudent: (state, action) => {
      const { studentId, subjectId } = action.payload;

      const student = state.find((student) => student.id === studentId);

      student.subjects = student.subjects.filter((id) => id !== subjectId);
    },
  },
});

export const { addStudent, deleteStudent, enrollSubject, dropStudent } =
  studentsSlice.actions;
export default studentsSlice.reducer;
