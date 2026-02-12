import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
     available: {
      type: Boolean,
      default: true,
    },
    availability: [
      {
        day: {
          type: String,
          enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          required: true,
        },
        from: {
          type: String, // "09:00"
          required: true,
        },
        to: {
          type: String, // "17:00"
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
