import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    alba: {
      type: String,
      required: true,
    },
    albanTushaal: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    firstname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    mobile: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const gologdolSchema = new mongoose.Schema(
  {
    devterNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 0,
    },
    username: {
      type: String,
      required: true,
    },
    gologdol: {
      type: String,
      required: true,
    },
    regDate: {
      type: Date,
      default: Date.now,
    },
    worker: {
      type: String,
    },
    reason: {
      type: String,
    },
    recievedWorker: {
      type: String,
    },
    argaHemjee: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Gologdol =
  mongoose.models.Gologdol || mongoose.model("Gologdol", gologdolSchema);
