import { body, param } from 'express-validator';

export const createContactValidator = [
    param("company").isMongoId().withMessage("Invalid company id"),
    body("name").trim().notEmpty().withMessage("Contact name is required"),
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("phone").optional().isString().withMessage("Phone must be text")
];

export const updateContactValidator = [
    body("name").optional().trim().notEmpty().withMessage("Contact name cannot be empty"),
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("phone").optional().isString().withMessage("Phone must be text")
];
