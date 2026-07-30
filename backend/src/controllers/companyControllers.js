import {
    addCompany as companyService,
    getAllCompanies as getAll,
    getOneCompany
} from "../services/companyService.js";

export async function addCompany(req, res) {
    try {
        const { name, industry, website } = req.body;
        const createdBy = req.user.id;
        const newCompany = await companyService(name, industry, website, createdBy);
        res.status(201).json(newCompany)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

export async function getALlCompany(req, res) {
    try {
        const allCompanies = await getAll();
        res.status(200).json(allCompanies)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

export async function getSingleCompany(req, res) {
    try {
        const { id } = req.params
        const company = await getOneCompany(id)
        res.status(200).json(company)
    } catch (err) {
        res.status(404).json(err.message)
    };
};