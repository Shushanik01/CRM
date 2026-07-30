import express from "express";
import { addCompany, getALlCompany} from "../controllers/companyControllers.js";
import { protectAuth } from "../middlewares/authMiddleware.js";

const companyRoutes = express.Router();
companyRoutes.post("/", protectAuth, addCompany);
companyRoutes.get("/", protectAuth, getALlCompany)


export default companyRoutes