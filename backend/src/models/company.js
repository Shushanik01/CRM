import mongoose, { mongo } from "mongoose";

const companySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    industry: {
        type: String
    },
    website:{
        type: String
    },
    createdBy:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
},
{timestamps: true}
); 

const Company = mongoose.model("Company", companySchema)
export default Company