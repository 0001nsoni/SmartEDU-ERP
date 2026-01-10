import Club from "../models/Club.js";
import ClubApplication from "../models/ClubApplication.js";
import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";

/**
 * ADMIN → CREATE CLUB
 */
export const createClub = async (req, res) => {
  const { name, description, facultyInCharge } = req.body;

  const club = await Club.create({
    institutionId: req.user.institutionId,
    name,
    description,
    facultyInCharge
  });

  res.status(201).json({
    message: "Club created successfully",
    clubId: club._id
  });
};

/**
 * STUDENT → APPLY CLUB
 */
export const applyToClub = async (req, res) => {
  const { clubId } = req.params;

  const student = await Student.findOne({
    userId: req.user.userId
  });

  const exists = await ClubApplication.findOne({
    clubId,
    studentId: student._id
  });

  if (exists) {
    return res.status(400).json({ message: "Already applied" });
  }

  const application = await ClubApplication.create({
    institutionId: req.user.institutionId,
    clubId,
    studentId: student._id
  });

  res.json({ message: "Club application submitted", applicationId: application._id });
};

/**
 * FACULTY → APPROVE / REJECT
 */
export const facultyDecision = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  if (!["PENDING_ADMIN", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid decision" });
  }

  const faculty = await Faculty.findOne({ userId: req.user.userId });

  const app = await ClubApplication.findById(applicationId);
  app.status = status;
  app.facultyDecisionBy = faculty._id;
  await app.save();

  res.json({ message: "Faculty decision recorded" });
};

/**
 * ADMIN → FINAL APPROVAL
 */
export const adminDecision = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid decision" });
  }

  const app = await ClubApplication.findById(applicationId);

  app.status = status;
  app.adminDecisionBy = req.user.userId;

  if (status === "APPROVED") {
    const club = await Club.findById(app.clubId);
    club.members.push(app.studentId);
    await club.save();
  }

  await app.save();

  res.json({ message: `Application ${status.toLowerCase()}` });
};
