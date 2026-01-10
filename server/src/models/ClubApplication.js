import mongoose from "mongoose";

const clubApplicationSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING_FACULTY", "PENDING_ADMIN", "APPROVED", "REJECTED"],
      default: "PENDING_FACULTY"
    },
    facultyDecisionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty"
    },
    adminDecisionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("ClubApplication", clubApplicationSchema);
