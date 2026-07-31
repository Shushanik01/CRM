import { body, param } from 'express-validator';

export const createDealValidator = [
    param("contact").isMongoId().withMessage("Invalid contact id"),
    param("company").isMongoId().withMessage("Invalid company id"),
    body("title").trim().notEmpty().withMessage("Deal title is required"),
    body("value").isNumeric().withMessage("Deal value must be a number"),
    body("stage").optional().isIn(["lead", "proposal", "negotiation", "won", "lost"]).withMessage("Invalid stage")
];

export const updateDealValidator = [
    body("title").optional().trim().notEmpty().withMessage("Deal title cannot be empty"),
    body("value").optional().isNumeric().withMessage("Deal value must be a number"),
    body("stage").optional().isIn(["lead", "proposal", "negotiation", "won", "lost"]).withMessage("Invalid stage")
];
