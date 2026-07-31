import express from 'express';
import { addNewDeal, getAllDeals, getOneDeal } from '../controllers/dealController.js';
import { protectAuth } from '../middlewares/authMiddleware.js';

const dealRoute = express.Router();

dealRoute.post("/:contact/:company", protectAuth, addNewDeal);
dealRoute.get('/', protectAuth, getAllDeals);
dealRoute.get('/:title', protectAuth, getOneDeal)

export default dealRoute