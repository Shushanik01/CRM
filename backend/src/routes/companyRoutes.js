import express from "express";
import { addCompany, getALlCompany, getSingleCompany} from "../controllers/companyControllers.js";
import { protectAuth } from "../middlewares/authMiddleware.js";

const companyRoutes = express.Router();
companyRoutes.post("/", protectAuth, addCompany);
companyRoutes.get("/", protectAuth, getALlCompany);
companyRoutes.get('/:id', protectAuth, getSingleCompany);


export default companyRoutes