import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentId: {
    type: Number,
    unique: true,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  course: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  subjects: {
    type: [Number],
    default: [],
  },
});

const student = mongoose.model("student", studentSchema);
export default student;
