import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true 
    }, 
    email: {
        type: String
    }, 
    phone: {type: String},
    company: {type: mongoose.Schema.Types.ObjectId,
        ref: "Company",

    }, 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{
    timestamps: true
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact