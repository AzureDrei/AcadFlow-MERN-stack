import express from "express";
import { login, addAdmin } from "../controller/authController.js";

const routes = express.Router();

routes.post("/", login);

export default routes;
