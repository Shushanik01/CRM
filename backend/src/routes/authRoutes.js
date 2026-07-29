import express from "express"
import { registerUser,
    loginUser
 } from "../controllers/authController";

const authRouter = express.application()

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser)
export default authRouter