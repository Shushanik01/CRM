import { body } from 'express-validator';


export const createCompanyValidator = [
    body("name").trim().notEmpty().withMessage("Company name is required"),
    body("industry").optional().isString().withMessage("Industry must be text"),
    body("website").optional().isURL().withMessage("Website must be a valid URL")
];

export const updateCompanyValidator = [
    body("name").optional().trim().notEmpty().withMessage("Company name cannot be empty"),
    body("industry").optional().isString().withMessage("Industry must be text"),
    body("website").optional().isURL().withMessage("Website must be a valid URL"),
];