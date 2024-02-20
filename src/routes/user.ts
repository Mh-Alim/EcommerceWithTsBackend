import express from "express";
import { getAllUsers, newUser,getUser, deleteUser } from "../controllers/user.js";
import { adminOnly } from "../middlewares/authorization.middleware.js";

const router = express.Router();


// route - /api/v1/user/new
router.post("/new", newUser);


// route - /api/v1/user/all
router.get("/all", adminOnly, getAllUsers)

router.route("/:id").get(adminOnly,getUser).delete(adminOnly,deleteUser);
export default router;