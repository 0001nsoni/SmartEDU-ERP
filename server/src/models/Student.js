import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true,
    },
    enrollmentNo: {
      type: String,
      unique: true,
      required: true,
    },
    studentType: {
      type: String,
      enum: ["HOSTELLER", "DAY_SCHOLAR", "BUS_SERVICE"],
      required: true,
    },
    hostelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
    },
    roomNumber: {
      type: String,
    },
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
    },
    clubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
