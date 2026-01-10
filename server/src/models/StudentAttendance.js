import mongoose from "mongoose";

const studentAttendanceSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    lectureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      required: true
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT"],
      required: true
    },
    markedBy: {
      type: String,
      enum: ["FACULTY", "BIOMETRIC"],
      default: "FACULTY"
    }
  },
  { timestamps: true }
);

export default mongoose.model("StudentAttendance", studentAttendanceSchema);
