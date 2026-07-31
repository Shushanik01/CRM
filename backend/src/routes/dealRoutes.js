import express from 'express';
import { addNewDeal } from '../controllers/dealController';
import authRouter from './authRoutes';

const dealRoute = express.Router();
dealRoute.post("/", authRouter, addNewDeal);

export default dealRoute