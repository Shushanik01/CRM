import { createDeal } from "../services/dealService";

export async function addNewDeal(req, res) {
    try {
        const { title, value, stage } = req.body
        const { contact, company, createdBy } = req.params
        const newDeal = await createDeal(title, value, stage, contact, company, createdBy);
        return newDeal
    } catch (err) {
        throw new Error(err.message)
    }
}