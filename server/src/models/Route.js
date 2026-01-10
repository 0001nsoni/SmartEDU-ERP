import mongoose from "mongoose";

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  order: { type: Number, required: true }
});

const routeSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true
    },
    routeName: { type: String, required: true },
    stops: [stopSchema],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Route", routeSchema);
