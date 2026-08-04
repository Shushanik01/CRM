import axiosClient from "./axiosClient";

export const getDeals = async () => {
    const deals = await axiosClient.get('/deal');
    return deals.data
};

export const getOneDeal = async (title) => {
    const deal = await axiosClient.get(`/deal/${title}`);
    return deal.data
};

export const createDeal = async (contact, company, newData) => {
    const newDeal = await axiosClient.post(`/deal/${contact}/${company}`, newData);
    return newDeal.data
};

export const updateDeal = async(id, newData) => {
    const deal = await axiosClient.put(`/deal/${id}`, newData);
    return deal.data
};

export const removeDeal = async (id) => {
    const deal = await axiosClient.delete(`/deal/${id}`);
    return deal.data
}