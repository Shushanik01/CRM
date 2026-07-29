import { registerUserService } from "../services/authService";
import express from "express"

const authRouter = express.application()

authRouter.post("/register", registerUserService);
export default authRouter