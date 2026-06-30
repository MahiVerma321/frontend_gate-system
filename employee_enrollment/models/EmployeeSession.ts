import mongoose from "mongoose";

const EmployeeSessionSchema =
  new mongoose.Schema(
    {
      employeeId: {
        type: String,
        required: true,
      },

      timestamp: {
        type: Date,
        default: Date.now,
      },

      status: {
        type: String,
        enum: [
          "entered",
          "exited",
        ],
        default: "entered",
      },

      confidence: Number,
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.EmployeeSession ||
  mongoose.model(
    "EmployeeSession",
    EmployeeSessionSchema
  );