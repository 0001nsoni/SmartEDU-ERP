import mongoose from "mongoose";

const mentorAttendanceSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    section: {
      type: String,
      required: true
    },

    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    session: {
      type: String,
      enum: ["MORNING", "AFTERNOON"],
      required: true
    },

    presentStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      }
    ]
  },
  { timestamps: true }
);

mentorAttendanceSchema.index(
  { courseId: 1, year: 1, section: 1, date: 1, session: 1 },
  { unique: true }
);

export default mongoose.model(
  "MentorAttendance",
  mentorAttendanceSchema
);
