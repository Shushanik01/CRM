import express from "express"
import { registerUser,
    loginUser,
    getUserInfo,
    logoutUser
 } from "../controllers/authController.js";
 import { protectAuth } from "../middlewares/authMiddleware.js";
 import { validate } from "../middlewares/validate.js";
 import { registerValidator, loginValidator } from "../validators/authValidator.js";

const authRouter = express.Router()

authRouter.post("/register", registerValidator, validate, registerUser);
authRouter.post("/login", loginValidator, validate, loginUser);
authRouter.get('/user', protectAuth, getUserInfo)
authRouter.post('/logout', protectAuth, logoutUser)
export default authRouter