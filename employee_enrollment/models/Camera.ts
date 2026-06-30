import mongoose from "mongoose";

const CameraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    streamUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["ONLINE", "OFFLINE"],
      default: "ONLINE",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Camera ||
  mongoose.model("Camera", CameraSchema);