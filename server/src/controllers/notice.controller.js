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
      targetAudience, // MUST match enum values exactly
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
    const { role, institutionId, userId } = req.user;

    let audiences = ["ALL"];

    // 🔑 ADMIN sees EVERYTHING
    if (role === "ADMIN") {
      audiences = [
        "ALL",
        "STUDENT",
        "FACULTY",
        "ADMIN",
        "HOSTELLERS",
        "BUS_USERS"
      ];
    }

    // 🎓 STUDENT
    else if (role === "STUDENT") {
      audiences.push("STUDENT");

      const student = await Student.findOne({ userId });

      if (student?.hostelId) audiences.push("HOSTELLERS");
      if (student?.busId) audiences.push("BUS_USERS");
    }

    // 👩‍🏫 FACULTY
    else if (role === "FACULTY") {
      audiences.push("FACULTY");
    }

    const notices = await Notice.find({
      institutionId,
      targetAudience: { $in: audiences },
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
