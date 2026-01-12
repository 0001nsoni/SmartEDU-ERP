import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    durationYears: {
      type: Number,
      required: true
    },

    totalSemesters: {
      type: Number,
      required: true
    },

    specializations: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
