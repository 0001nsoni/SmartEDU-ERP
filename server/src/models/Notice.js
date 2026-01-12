import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    targetAudience: {
      type: [String],
      enum: [
        "ALL",
        "STUDENT",
        "FACULTY",
        "HOSTELLERS",
        "BUS_USERS",
        "CLUB_MEMBERS"
      ],
      default: ["ALL"]
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    expiresAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.model("Notice", noticeSchema);
