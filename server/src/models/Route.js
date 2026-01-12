import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true,
    },
    routeName: { type: String, required: true },
    stops: [
      {
        name: { type: String, required: true },
        lat: Number,
        lng: Number,
        order: { type: Number, required: true },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Route", routeSchema);
