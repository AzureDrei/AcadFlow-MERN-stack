import express from "express";
import {
  addStudent,
  findAllStudents,
  findStudent,
  deleteStudent,
  updateStudent,
} from "../controller/studentController.js";

import { login } from "../controller/authController.js";

import {
  authenticateToken,
  adminOnly,
} from "../utilities/authenticateToken.js";

const routes = express.Router();

routes.post("/", addStudent, authenticateToken, adminOnly);
routes.get("/", findAllStudents, authenticateToken, adminOnly);
routes.get("/:id", findStudent, authenticateToken, adminOnly);
routes.post("/login", login);
routes.delete("/:id", deleteStudent);
routes.put("/:id", updateStudent);

export default routes;
