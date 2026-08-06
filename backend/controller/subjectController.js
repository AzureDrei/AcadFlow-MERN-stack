import subject from "../models/Subjects.js";

export const addSubject = async (req, res) => {
  try {
    const lastSubject = await subject.findOne().sort({ subjectId: -1 });

    let newId;
    if (!lastSubject) {
      newId = 101;
    } else {
      newId = lastSubject.subjectId + 1;
    }

    const newSubject = new subject({
      subjectId: newId,
      subjectName: req.body.subjectName,
      day: req.body.day,
      start: req.body.start,
      end: req.body.end,
    });
    const save = await newSubject.save();
    res.status(201).json(save);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const findAllSubjects = async (req, res) => {
  try {
    const getSubjects = await subject.find();
    res.status(200).json(getSubjects);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const findSubject = async (req, res) => {
  try {
    const getSubject = await subject.findOne({
      subjectId: Number(req.params.id),
    });
    res.status(200).json(getSubject);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const delSubject = await subject.findOneAndDelete({
      subjectId: Number(req.params.id),
    });
    res.status(204).json(delSubject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const upSubject = await subject.findOneAndUpdate(
      { subjectId: Number(req.params.id) },
      {
        subjectName: req.body.subjectName,
        day: req.body.day,
        start: req.body.start,
        end: req.body.end,
      },
      { new: true },
    );
    res.status(200).json(upSubject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
