import Contact from "../models/contact.js";

export const getAllContacts = async () => {
    try {
        const allContact = await Contact.find().populate("company").populate("createdBy");
        return allContact
    } catch (err) {
        throw new Error(err.message)
    }
};

export const getSingleContact = async (id) => {
    try {
        const contact = await Contact.findOne({ _id: id }).populate("company").populate("createdBy");
        if (!contact) {
            throw new Error('Contact does not exist')
        } else {
            return contact
        }
    } catch (err) {
        throw new Error(err.message)
    }
};

export const editContact = async (id, updateData) => {
    try {
        const contact = await Contact.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!contact) {
            throw new Error('No contact found')
        } else {
            return contact
        }
    } catch (err) {
        throw new Error(err.message)
    }
};

export const createContact = async (name, email, phone, company, createdBy) => {
    try {
        const newContact = await Contact.create({ name, email, phone, company, createdBy });
        return newContact
    } catch (err) {
        throw new Error(err.message)
    }
};

export const deleteContact = async (id) => {
    try {
        const deleted = await Contact.findByIdAndDelete(id);
        if (!deleted) {
            throw new Error('No such contact exists')
        } else {
            return {
                sucess: true,
                message: 'Contact deleted successfully!'
            }
        }
    } catch (err) {
        throw new Error(err.message)
    }
}