import axiosClient from "./axiosClient";

export const getAllContact = async () => {
    const allContacts = await axiosClient.get('/contact');
    return allContacts.data
};

export const getOneContact = async (id) => {
    const contact = await axiosClient.get(`/contact/${id}`);
    return contact.data
};

export const editContact = async (id, data) => {
    const contact = await axiosClient.put(`/contact/${id}`, data);
    return contact.data
};

export const createContact = async (companyId, contactData) => {
    const newContact = await axiosClient.post(`/contact/${companyId}`, contactData);
    return newContact.data
};

export const removeContact = async (id) => {
    const deleted = await axiosClient.delete(`/contact/${id}`);
    return deleted.data
};