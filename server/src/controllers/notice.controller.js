import Notice from "../models/Notice.js";
import Student from "../models/Student.js";

/**
 * CREATE NOTICE (ADMIN / FACULTY)
 */
export const createNotice = async (req, res) => {
  try {
    const { title, message, targetAudience, expiresAt } = req.body;

    const notice = await Notice.create({
      institutionId: req.user.institutionId,
      title,
      message,
      targetAudience,
      postedBy: req.user.userId,
      expiresAt
    });

    res.status(201).json({
      message: "Notice created successfully",
      noticeId: notice._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET NOTICES (ROLE-BASED VISIBILITY)
 */
export const getMyNotices = async (req, res) => {
  try {
    let audience = ["ALL"];

    if (req.user.role === "STUDENT") {
      audience.push("STUDENTS");

      const student = await Student.findOne({
        userId: req.user.userId
      });

      if (student?.hostelId) audience.push("HOSTELLERS");
      if (student?.busId) audience.push("BUS_USERS");
    }

    if (req.user.role === "FACULTY") {
      audience.push("FACULTY");
    }

    const notices = await Notice.find({
      institutionId: req.user.institutionId,
      targetAudience: { $in: audience },
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gte: new Date() } }
      ]
    }).sort({ createdAt: -1 });

    res.json({ notices });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
