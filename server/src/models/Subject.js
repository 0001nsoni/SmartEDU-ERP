import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
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

    name: {
      type: String,
      required: true
    },

    code: {
      type: String,
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

    type: {
      type: String,
      enum: ["THEORY", "LAB"],
      required: true
    }
  },
  { timestamps: true }
);

subjectSchema.index(
  { institutionId: 1, courseId: 1, code: 1 },
  { unique: true }
);

export default mongoose.model("Subject", subjectSchema);
