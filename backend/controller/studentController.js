import student from "../models/Student.js";
import bcrypt from "bcryptjs";

export const addStudent = async (req, res) => {
  try {
    const lastStudent = await student.findOne().sort({ studentId: -1 });
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let newId;
    if (!lastStudent) {
      newId = 226001;
    } else {
      newId = lastStudent.studentId + 1;
    }

    const newStudent = new student({
      studentId: newId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      course: req.body.course,
      password: hashedPassword,
    });
    const save = await newStudent.save();
    res.status(201).json(save);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const findAllStudents = async (req, res) => {
  try {
    const getStudents = await student.find();
    res.status(201).json(getStudents);
  } catch (error) {
    res.status(400).json(error, "Cannot get all students");
  }
};

export const findStudent = async (req, res) => {
  try {
    console.log(req.params.id);

    const getStudent = await student.findOne({
      studentId: Number(req.params.id),
    });

    console.log(getStudent);

    res.status(200).json(getStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const delStudent = await student.findOneAndDelete({
      studentId: Number(req.params.id),
    });
    res.status(204).json(delStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const upStudent = await student.findOneAndUpdate(
      { studentId: Number(req.params.id) },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        course: req.body.course,
      },
      { new: true },
    );
    res.status(200).json(upStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
