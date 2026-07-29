import { registerUserService } from "../services/authService";

export const registerUser = async (req, res)=>{
    try {
        const {name, email, password} = req.body
        const user = await registerUserService(name, email, password)
        res.status(201).json(user)
    }catch(err){
        res.send(400).json({error:err.message
            
        })
    }
}