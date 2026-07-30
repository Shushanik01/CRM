import express from "express";
import { addCompany } from "../controllers/companyControllers";

const companyRoutes = express.Router();
companyRoutes.post("/company", addCompany)


export default companyRoutes