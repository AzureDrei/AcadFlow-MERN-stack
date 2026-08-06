import express from "express";
import {generateReport} from "../controller/aiController.js"

const routes = express.Router();

routes.post("/", generateReport)

export default routes