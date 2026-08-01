import express from "express";
import {
    addCompany,
    getALlCompany,
    getSingleCompany,
    updateCompany,
    removeCompany
} from "../controllers/companyControllers.js";
import { checkOwnership, protectAuth } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createCompanyValidator, updateCompanyValidator } from "../validators/companyValidator.js";
import Company from "../models/company.js";

const companyRoutes = express.Router();


companyRoutes.post("/", protectAuth, createCompanyValidator, validate, addCompany);
companyRoutes.get("/", protectAuth, getALlCompany);
companyRoutes.get('/:id', protectAuth, getSingleCompany);
companyRoutes.put('/:id', protectAuth, checkOwnership(Company), updateCompanyValidator, validate, updateCompany);
companyRoutes.delete('/:id', protectAuth, checkOwnership(Company), removeCompany)


export default companyRoutes