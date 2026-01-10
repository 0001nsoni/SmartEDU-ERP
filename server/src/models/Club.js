import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    name: { type: String, required: true },
    description: String,
    facultyInCharge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      }
    ],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Club", clubSchema);
