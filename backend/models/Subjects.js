import mongoose, { mongo } from "mongoose";

const subjectSchema = new mongoose.Schema({
  subjectId: {
    type: Number,
    unique: true,
    required: true,
  },
  subjectName: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const subject = mongoose.model("subject", subjectSchema);
export default subject;
