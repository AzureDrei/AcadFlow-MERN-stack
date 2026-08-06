import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const INVALID_CREDENTIALS = "Invalid username or password";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const foundAdmin = await Admin.findOne({ username });

    if (foundAdmin) {
      const isPasswordValid = await bcrypt.compare(
        password,
        foundAdmin.password,
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          message: INVALID_CREDENTIALS,
        });
      }

      const token = jwt.sign(
        {
          username: foundAdmin.username,
          role: "admin",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      return res.status(200).json({
        success: true,
        token,
        role: "admin",
      });
    }

    const foundStudent = await Student.findOne({
      studentId: Number(username),
    });

    if (!foundStudent) {
      return res.status(401).json({
        message: INVALID_CREDENTIALS,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      foundStudent.password,
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: INVALID_CREDENTIALS,
      });
    }

    const token = jwt.sign(
      {
        studentId: foundStudent.studentId,
        role: "student",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "6h",
      },
    );

    return res.status(201).json({
      success: true,
      token,
      studentId: foundStudent.studentId,
      role: "student",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const addAdmin = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newAdmin = new Admin({
      username: req.body.username,
      password: hashedPassword,
    });
    const save = await newAdmin.save();
    res.status(201).json(save);
  } catch (error) {
    res.status(401).json(error.message);
  }
};
