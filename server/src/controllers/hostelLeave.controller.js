import HostelLeave from "../models/HostelLeave.js";
import Student from "../models/Student.js";
import Faculty from "../models/Faculty.js";

/**
 * STUDENT → APPLY LEAVE
 */
export const applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    const student = await Student.findOne({
      userId: req.user.userId,
      institutionId: req.user.institutionId
    });

    if (!student || !student.hostelId) {
      return res.status(400).json({
        message: "Hostel student not found"
      });
    }

    const leave = await HostelLeave.create({
      institutionId: req.user.institutionId,
      studentId: student._id,
      hostelId: student.hostelId,
      fromDate,
      toDate,
      reason
    });

    res.status(201).json({
      message: "Leave applied successfully",
      leaveId: leave._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * WARDEN → VIEW PENDING LEAVES
 */
export const getPendingLeaves = async (req, res) => {
  try {
    const leaves = await HostelLeave.find({
      institutionId: req.user.institutionId,
      status: "PENDING"
    })
      .populate("studentId")
      .populate("hostelId");

    res.json({ leaves });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * WARDEN → APPROVE / REJECT LEAVE
 */
export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const faculty = await Faculty.findOne({
      userId: req.user.userId,
      institutionId: req.user.institutionId
    });

    const leave = await HostelLeave.findOne({
      _id: leaveId,
      institutionId: req.user.institutionId
    });

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = status;
    leave.approvedBy = faculty._id;

    await leave.save();

    res.json({ message: `Leave ${status.toLowerCase()} successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
