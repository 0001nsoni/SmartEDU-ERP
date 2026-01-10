import Subject from "../models/Subject.js";
import Lecture from "../models/Lecture.js";

/**
 * ADMIN → CREATE SUBJECT
 */
export const createSubject = async (req, res) => {
  const { name, code, semester, facultyId } = req.body;

  const subject = await Subject.create({
    institutionId: req.user.institutionId,
    name,
    code,
    semester,
    facultyId
  });

  res.status(201).json({ subjectId: subject._id });
};

/**
 * ADMIN → CREATE LECTURE
 */
export const createLecture = async (req, res) => {
  const { subjectId, facultyId, day, startTime, endTime, room } = req.body;

  const lecture = await Lecture.create({
    institutionId: req.user.institutionId,
    subjectId,
    facultyId,
    day,
    startTime,
    endTime,
    room
  });

  res.status(201).json({ lectureId: lecture._id });
};

/**
 * STUDENT / FACULTY → VIEW TIMETABLE
 */
export const getMyTimetable = async (req, res) => {
  let filter = { institutionId: req.user.institutionId };

  if (req.user.role === "FACULTY") {
    filter.facultyId = req.user.userId;
  }

  const lectures = await Lecture.find(filter)
    .populate("subjectId", "name code")
    .populate("facultyId");

  res.json({ lectures });
};
