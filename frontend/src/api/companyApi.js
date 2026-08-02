import axiosClient from "./axiosClient"

export const getCompanies = async () => {
    const companies = await axiosClient.get('/company');
    return companies.data
};

export const createCompany = async (companyData) => {
    const created = await axiosClient.post('/company', companyData);
    return created.data
};

export const deleteCompany = async (id) => {
    const deleted = await axiosClient.delete(id);
    return deleted.data
};

export const getSingleCompany = async (id) => {
    const company = await axiosClient.get('/company/:id');
    return company.data
};
export const editCompany = async(id, data) =>{
    const edited = await axiosClient.put('/company/:id', data)
}