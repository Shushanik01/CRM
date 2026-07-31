import express from 'express';
import { addNewDeal, getAllDeals } from '../controllers/dealController.js';
import { protectAuth } from '../middlewares/authMiddleware.js';

const dealRoute = express.Router();

dealRoute.post("/:contact/:company", protectAuth, addNewDeal);
dealRoute.get('/', protectAuth, getAllDeals)

export default dealRoute