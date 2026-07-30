import express from "express";
import { addCompany, getALlCompany} from "../controllers/companyControllers";

const companyRoutes = express.Router();
companyRoutes.post("/company", addCompany);
companyRoutes.get("/company", getALlCompany)


export default companyRoutes