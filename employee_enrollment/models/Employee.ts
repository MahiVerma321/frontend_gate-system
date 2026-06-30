import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    videoUrl: {
      type: String,
      required: true,
      trim: true,
    },

    avatarTheme: {
      type: String,
      enum: [
        "cyan",
        "green",
        "amber",
        "red",
        "violet",
        "blue",
        "purple",
      ],
      default: "blue",
      required: true,
    },

    accountStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema);