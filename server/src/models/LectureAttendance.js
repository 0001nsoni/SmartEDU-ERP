import mongoose from "mongoose";

const lectureAttendanceSchema = new mongoose.Schema(
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

    date: {
      type: Date,
      required: true
    },

    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

/* One lecture attendance per day */
lectureAttendanceSchema.index(
  { lectureId: 1, date: 1 },
  { unique: true }
);

export default mongoose.model(
  "LectureAttendance",
  lectureAttendanceSchema
);
