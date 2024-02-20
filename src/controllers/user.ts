import { NextFunction, Request, Response } from "express";
import { newUserReqBody } from "../types/types.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.middleware.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, newUserReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, password, dob, photo, gender } = req.body;

    if (!name || !email || !password || !dob || !photo || !gender)
            return next(new ErrorHandler("Please Enter All The Fields", 400));
        
        
    const userExist = await User.findOne({ email });
    if (userExist) return next(new ErrorHandler("User Already Exists", 400));
    const user = await User.create({
      name,
      email,
      password,
      dob: new Date(dob),
      gender,
      photo,
    });
    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  }
);


export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({});
    return res.status(200).json({
        success: true,
        users
    })
})


export const getUser = TryCatch(async (req, res, next) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return next(new ErrorHandler("User not found", 404));
    return res.status(200).json({
        success: true,
        user
    })
})


export const deleteUser= TryCatch(async (req, res, next) => {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return next(new ErrorHandler("User not found", 404));
    await user.deleteOne();
    return res.status(200).json({
        success: true,
        message : "User deleted successfully",
        user
    })
})
