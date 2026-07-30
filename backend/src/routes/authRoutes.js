import express from "express"
import { registerUser,
    loginUser,
    getUserInfo
 } from "../controllers/authController.js";
 import { protectAuth } from "../middlewares/authMiddleware.js";

const authRouter = express.Router()

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get('/user', protectAuth, getUserInfo)
export default authRouter