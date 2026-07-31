import express from 'express';
import { protectAuth } from '../middlewares/authMiddleware.js';
import {
    allContacts,
    singleContact,
    addContact,
    removeContact,
    updateContact,
} from '../controllers/contactController.js';

const contactRouter = express.Router();

contactRouter.get('/', protectAuth, allContacts);
contactRouter.get('/:id', protectAuth, singleContact);
contactRouter.post('/:company', protectAuth, addContact);
contactRouter.put('/:id', protectAuth, updateContact);
contactRouter.delete('/:id', protectAuth, removeContact);

export default contactRouter