import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Username exist"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      unique: false,
    },
    email: {
      type: String,
      required: [true, "Please provide a unique email"],
      unique: true,
    },
    otp: {
        type: String
    },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: Number },
    address: { type: String },
    profile: { type: String },
  },

  {
    timestamps: true,
  }
);

// use the existing model if avaliable else create a new one
export const UserModel = mongoose.model.Users || mongoose.model("User", userSchema);
