import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.middleware.js";



export const adminOnly = TryCatch(async (req, res, next) => {
    const id = req.query.id;
    if (!id) return next(new ErrorHandler("You are not logged in", 400));
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("Wrong id", 400));
    if (user?.role !== "admin") return next(new ErrorHandler("You are not admin", 401));
    
    next();

})