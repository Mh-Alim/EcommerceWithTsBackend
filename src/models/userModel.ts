import mongoose from "mongoose";
import validator from "validator";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  photo: string;
  role: "admin" |  "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  password: string;

    // virtual attribute
  age: number;
}
const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      validate: validator.default.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please enter photo"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please enter gender"],
    },
    dob: {
      type: Date,
      required: [true, "Please enter dob"],
    },
    password: {
      type: String,
      required: [true, "Please enter password"]
    }
  },
  { timestamps: true }
);

userSchema.virtual("age").get(function () {
  const dob = this.dob;
  let curr = new Date(Date.now());

  let age = curr.getFullYear() - dob.getFullYear();

  if (
    curr.getMonth() < dob.getMonth() ||
    (curr.getMonth() === dob.getMonth() && curr.getDate() < dob.getDate())
  )
    age--;

  return age;
});

export const User =  mongoose.model<IUser>("User", userSchema);
