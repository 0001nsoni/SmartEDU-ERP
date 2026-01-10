import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    employeeId: {
      type: String,
      unique: true,
      required: true
    },
    facultyType: {
      type: [String],
      enum: ["LECTURER", "WARDEN", "CLUB_INCHARGE", "TRANSPORT_MANAGER"],
      default: ["LECTURER"]
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Faculty", facultySchema);
