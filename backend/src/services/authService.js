import User from "../models/Users";
import bcrypt from "bcryptjs";

export const registerUserService = async (name, email, password)=>{
   try{
     const userExicts = await User.findOne({email})
     if(userExicts){
        throw new Error("User with this email already exists")
     }else{
      const hashedPassword =  await bcrypt.hash(password, 10); 
   const newUser =  await   User.create({
name: name,
email: email, 
password: hashedPassword
     })
     return newUser
     }
     
   }catch(err){
    throw new Error(err.message)
   }
    
}