import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
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
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    semester: {
      type: Number,
      required: true
    },
    section: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Mentor", mentorSchema);
