import { protectAuth } from "../middlewares/authMiddleware";
import {
    getAllContacts,
    getSingleContact,
    createContact,
    deleteContact,
    editContact
} from "../services/contactService";

export const allContacts = async (req, res) => {
    try {
        const Contacts = await getAllContacts();
        res.status(200).json(Contacts)
    } catch (err) {
        res.status(404).json(err.message)
    }
};

export const singleContact = async (req, res) => {
    try {
        const { id } = req.params
        const contact = await getAllContacts(id);
        res.status(200).json(contact)
    } catch (err) {
        throw new Error(err.message)
    }
};

export const addContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body
        const { company } = req.params;
        const createdBy = req.user.id
        const newContact = await createContact(name, email, phone, company, createdBy);
        res.status(201).json(newContact)
    } catch (err) {
        throw new Error(err.message)
    }
};

export const removeContact = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await deleteContact(id);
        res.status(200).json('Contact deleted successfully!')
    } catch (err) {
        res.status(400).json(err.message)
    }
};

export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body
        const updated = await editContact(id, updateData)
        res.status(200).json(updated)
    } catch (err) {
        res.status(404).json(err.message)
    }
}