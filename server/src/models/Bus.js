import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    busNumber: {
      type: String,
      required: true,
      unique: true
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver"
    },
    capacity: { type: Number, default: 40 },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      }
    ],
    currentLocation: {
      lat: Number,
      lng: Number,
      updatedAt: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Bus", busSchema);
