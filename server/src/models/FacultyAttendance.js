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

    status: {
      type: String,
      enum: ["PRESENT", "ABSENT"],
      default: "PRESENT"
    }
  },
  { timestamps: true }
);

/* One attendance per day */
facultyAttendanceSchema.index(
  { facultyId: 1, date: 1 },
  { unique: true }
);

export default mongoose.model(
  "FacultyAttendance",
  facultyAttendanceSchema
);
