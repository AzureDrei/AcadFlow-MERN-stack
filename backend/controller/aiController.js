import { GoogleGenAI } from "@google/genai";
import Students from "../models/Student.js";
import Subjects from "../models/Subjects.js";

export const generateReport = async (req, res) => {
  try {
    const students = await Students.find();
    const subjects = await Subjects.find();

    const prompt = `
          You are an academic enrollment analyst.

              Students:
              ${JSON.stringify(students, null, 2)}

              Subjects:
              ${JSON.stringify(subjects, null, 2)}

              Analyze the data above.

              Return ONLY valid JSON.

              {
                "summary": "",
                "totalStudents": 0,
                "totalSubjects": 0,
                "mostEnrolledSubject": {
                  "name": "",
                  "students": 0
                },
                "leastEnrolledSubject": {
                  "name": "",
                  "students": 0
                },
                "recommendations": [
                  "",
                  "",
                  ""
                ]
              }
              `;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: prompt,
    });

    const report = JSON.parse(interaction.output_text);

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
