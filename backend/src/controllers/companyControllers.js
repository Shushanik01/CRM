import { addCompany as companyService } from "../services/companyService";

export async function addCompany(req, res){
    try {
    const {name, industry, website, createdBy} = req.body;
 const  newCompany =  await companyService(name, industry, website, createdBy );
    res.send(201).json(newCompany)
    }catch(err){
        res.send(400).json({message: err.message})
    }
}