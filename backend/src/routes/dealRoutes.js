import express from 'express';
import {
    addNewDeal,
    getAllDeals,
    getOneDeal,
    updateOneDeal,
    removeDeal
} from '../controllers/dealController.js';
import {
    protectAuth,
    checkOwnership
} from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createDealValidator, updateDealValidator } from '../validators/dealValidator.js';
import Deal from '../models/dealSchema.js';

const dealRoute = express.Router();

dealRoute.post("/:contact/:company", protectAuth, createDealValidator, validate, addNewDeal);
dealRoute.get('/', protectAuth, getAllDeals);
dealRoute.get('/:title', protectAuth, getOneDeal);
dealRoute.put('/:id', protectAuth, checkOwnership(Deal), updateDealValidator, validate, updateOneDeal);
dealRoute.delete("/:id", protectAuth, checkOwnership(Deal), removeDeal)

export default dealRoute