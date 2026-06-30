import mongoose from "mongoose";

const RecognitionLogSchema =
  new mongoose.Schema(
    {
      employeeId: String,

      employeeName: String,

      timestamp: {
        type: Date,
        default: Date.now,
      },

      status: {
        type: String,
        enum: [
          "ENTRY",
          "EXIT",
          "RECOGNIZED",
        ],
      },

      location: {
        type: String,
        default: "Main Gate",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models
  .RecognitionLog ||
  mongoose.model(
    "RecognitionLog",
    RecognitionLogSchema
  );