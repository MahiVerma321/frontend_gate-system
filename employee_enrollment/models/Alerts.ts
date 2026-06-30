import mongoose from "mongoose";

const AlertSchema =
  new mongoose.Schema(
    {
      title: String,

      description: String,

      severity: {
        type: String,
        enum: [
          "LOW",
          "MEDIUM",
          "HIGH",
        ],
        default: "LOW",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models.Alert ||
  mongoose.model(
    "Alert",
    AlertSchema
  );