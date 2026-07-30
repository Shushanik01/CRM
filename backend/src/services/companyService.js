
import Company from "../models/company";

export async function addCompany(name, industry, website, createdBy){
try{
    const compName = await Company.findOne({name});
    if(compName){
    throw new Error ({message: "Company with this name already exits" })
    } else {
        const newCompany = await Company.create({
            name, 
            industry,
            website, 
            createdBy
        });
    }; 
    return newCompany
}catch(err){
    throw new Error(err.message)
}
};

export async function getAllCompanies(){
    try{
    const allCompanies = await Company.find();
    return allCompanies
    }catch(err){
        throw new Error(err.message)
    }
}