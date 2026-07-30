import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const dealSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
value: {
    type: Number,
    required: true
},
stage: {
    type: String, 
    enum:["lead", "proposal", "negotiation", "won", "lost"],
    default: "lead"
},
contact:{
    type: mongoose.Schema.ObjectId,
    ref: "Contact"
},
company : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
},
createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
}
},
{
    Timestamp: true
});
const Deal = mongoose.model("Deal", dealSchema);
export default Deal