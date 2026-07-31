import express from 'express';
import { protectAuth, checkOwnership } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createContactValidator, updateContactValidator } from '../validators/contactValidator.js';
import {
    allContacts,
    singleContact,
    addContact,
    removeContact,
    updateContact,
} from '../controllers/contactController.js';
import Contact from '../models/contact.js';

const contactRouter = express.Router();

contactRouter.get('/', protectAuth, allContacts);
contactRouter.get('/:id', protectAuth, singleContact);
contactRouter.post('/:company', protectAuth, createContactValidator, validate, addContact);
contactRouter.put('/:id', protectAuth, checkOwnership(Contact), updateContactValidator, validate, updateContact);
contactRouter.delete('/:id', protectAuth, checkOwnership(Contact),removeContact);

export default contactRouter