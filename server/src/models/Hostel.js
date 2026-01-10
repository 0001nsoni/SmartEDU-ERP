import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  capacity: { type: Number, required: true },
  occupants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  ]
});

const hostelSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["BOYS", "GIRLS"],
      required: true
    },
    wardenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty"
    },
    rooms: [roomSchema],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Hostel", hostelSchema);
