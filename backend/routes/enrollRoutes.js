import express from "express";
import { enrollStudent, dropSubject } from "../controller/enrollController.js";

const routes = express.Router();

routes.post("/:id", enrollStudent);
routes.delete("/:id", dropSubject);

export default routes;
