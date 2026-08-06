import express from "express";
import {
  addSubject,
  findAllSubjects,
  findSubject,
  deleteSubject,
  updateSubject,
} from "../controller/subjectController.js";

const routes = express.Router();

routes.post("/", addSubject);
routes.get("/", findAllSubjects);
routes.get("/:id", findSubject);
routes.delete("/:id", deleteSubject);
routes.put("/:id", updateSubject);

export default routes;
