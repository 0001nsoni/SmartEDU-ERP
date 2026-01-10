import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    licenseNumber: { type: String, required: true },
    assignedBusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus"
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Driver", driverSchema);
