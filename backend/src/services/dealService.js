import Deal from "../models/dealSchema.js";

export const createDeal =
    async (title, value, stage, contact, company, createdBy) => {
        try {
            const deal = await Deal.findOne({ title })
            if (deal) {
                throw new Error("Deal already exists");
            }

            const newDeal = await Deal.create({
                title,
                value,
                stage,
                contact,
                company,
                createdBy,
            });
            return newDeal
        } catch (err) {
            throw new Error(err.message)
        }
    };

export const getAllDeals = async () => {
    try {
        const allDeals = await Deal.find();
        return allDeals
    } catch (err) {
        throw new Error(err.message)
    }
};

export const getSingleDeal = async (title) => {
    try {
        const deal = await Deal.findOne({ title });
        return deal
    } catch (err) {
        throw new Error(err.message)
    }
};

export async function updateDeal(id, updateData) {
    try {
        const updateDeal = await Deal.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updateDeal) {
            throw new Error('Deal does not exist')
        };
        return updateDeal
    } catch (err) {
        throw new Error(err.message)
    }
}