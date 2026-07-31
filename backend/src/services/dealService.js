import Deal from "../models/dealSchema";

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
    }