import { createSlice } from "@reduxjs/toolkit";

const subjectNames = [
  { id: 101, name: "Programming", day: "Monday", start: "08:00", end: "10:00" },
  { id: 102, name: "Calculus", day: "Monday", start: "10:00", end: "12:00" },
  { id: 103, name: "Biology", day: "Tuesday", start: "12:00", end: "14:00" },
];

const newId = (state) => {
  return state.length === 0 ? 101 : state[state.length - 1].id + 1;
};

const savedSubjects = localStorage.getItem("subjects");

const initialState = savedSubjects ? JSON.parse(savedSubjects) : subjectNames;

const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    addSubjects: (state, action) => {
      const newSubjects = {
        id: newId(state),
        name: action.payload.name,
        day: action.payload.day,
        start: action.payload.start,
        end: action.payload.end,
      };
      state.push(newSubjects);
    },

    deleteSubjects: (state, action) => {
      return state.filter((subject) => subject.id !== action.payload);
    },
  },
});

export const { deleteSubjects } = subjectsSlice.actions;
export default subjectsSlice.reducer;
