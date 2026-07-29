import mongoose from "mongoose"

const connectDB = async()=> {
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected");
        
    }catch (error){
        console.error(error)
        process.exit(1)
    }
}