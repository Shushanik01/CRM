import {
    createDeal,
    getAllDeals as getAll,
    getSingleDeal,
    updateDeal,
} from "../services/dealService.js";

export async function addNewDeal(req, res) {
    try {
        const { title, value, stage } = req.body
        const { contact, company } = req.params
        const createdBy = req.user.id
        const newDeal = await createDeal(title, value, stage, contact, company, createdBy);
        res.status(201).json(newDeal)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

export async function getAllDeals(req, res) {
    try {
        const allDeals = await getAll();
        res.status(200).json(allDeals)
    } catch (err) {
        res.status(404).json(err.message)
    }
};

export const getOneDeal = async (req, res) => {
    try {
        const { title } = req.params
        const sindleDeal = await getSingleDeal(title);
        if (!sindleDeal) {
            throw new Error(' Deal does not exist')
        }
        res.status(200).json(sindleDeal)
    } catch (err) {
        res.status(400).json(err.message)
    }
};

export const updateOneDeal = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body
        const updated = await updateDeal(id, updateData);
        res.status(200).json(updated)
    } catch (err) {
        res.status(404).json(err.message)
    }
}