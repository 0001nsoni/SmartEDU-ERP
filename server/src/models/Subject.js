import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    name: { type: String, required: true },
    code: { type: String, required: true },
    semester: { type: Number, required: true },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);

