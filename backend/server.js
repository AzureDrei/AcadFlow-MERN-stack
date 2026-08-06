import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import studentRoutes from "./routes/studentRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import enrollRoutes from "./routes/enrollRoutes.js";
import login from "./routes/authRoutes.js";
import AIReport from "./routes/aiRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/login", login);
app.use("/students", studentRoutes);
app.use("/subjects", subjectRoutes);
app.use("/enroll", enrollRoutes);
app.use("/aireport", AIReport);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
