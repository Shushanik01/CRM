import { addCompany as companyService,
    getAllCompanies as getAll
 } from "../services/companyService";

export async function addCompany(req, res){
    try {
    const {name, industry, website, createdBy} = req.body;
 const  newCompany =  await companyService(name, industry, website );
    res.status(201).json(newCompany)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}; 

export async function getALlCompany(req, res){
    try{
        const allCompanies = await getAll();
        res.status(200).json(allCompanies)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}