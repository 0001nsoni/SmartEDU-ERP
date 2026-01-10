import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true
    },
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      required: true
    },
    startTime: { type: String, required: true }, // "10:00"
    endTime: { type: String, required: true },   // "11:00"
    room: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Lecture", lectureSchema);
