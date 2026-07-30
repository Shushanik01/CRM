
import Company from "../models/company.js";

export async function addCompany(name, industry, website, createdBy) {
    try {
        const compName = await Company.findOne({ name });
        if (compName) {
            throw new Error("Company with this name already exists")
        }
        const newCompany = await Company.create({
            name,
            industry,
            website,
            createdBy
        });
        return newCompany
    } catch (err) {
        throw new Error(err.message)
    }
};

export async function getAllCompanies() {
    try {
        const allCompanies = await Company.find();
        return allCompanies
    } catch (err) {
        throw new Error(err.message)
    }
};

export const getOneCompany = async(id) => {
    try {
        const findCompany = await Company.findById(id);
        if(!findCompany){
            throw new Error('Company is not registered')
        } else{
            return findCompany
        }
    } catch(err){
        throw new Error(err.message)
    }
}