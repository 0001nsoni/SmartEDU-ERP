import mongoose from "mongoose";

const facultyAttendanceSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    inTime: { type: String },   // "09:30"
    outTime: { type: String },  // "17:00"
    source: {
      type: String,
      enum: ["MANUAL", "BIOMETRIC"],
      default: "MANUAL"
    }
  },
  { timestamps: true }
);

export default mongoose.model("FacultyAttendance", facultyAttendanceSchema);
