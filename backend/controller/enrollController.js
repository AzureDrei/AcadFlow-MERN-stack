import student from "../models/Student.js";
import subject from "../models/Subjects.js";

export const enrollStudent = async (req, res) => {
  try {
    const getStudent = await student.findOne({
      studentId: Number(req.params.id),
    });
    const subjectId = req.body.subjectId;
    getStudent.subjects.push(subjectId);
    const save = await getStudent.save();
    res.status(201).json(save);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const dropSubject = async (req, res) => {
  try {
    const getStudent = await student.findOne({
      studentId: Number(req.params.id),
    });
    const subjectId = req.body.subjectId;

    const updatedSubjects = getStudent.subjects.filter(
      (subjectIdStored) => subjectIdStored !== subjectId,
    );
    getStudent.subjects = updatedSubjects;
    await getStudent.save();

    res.status(204).json(updatedSubjects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
