import User from "../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const registerUserService = async (name, email, password) => {
    try {
        const userExicts = await User.findOne({ email })
        if (userExicts) {
            throw new Error("User with this email already exists")
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                name: name,
                email: email,
                password: hashedPassword
            })
            return newUser
        }

    } catch (err) {
        throw new Error(err.message)
    }

};

const payload = {
    email: user.email,
    role: user.role
}

export const loginUserService = async (email, password) => {
    try {
        const user = await User.findOne({ email })
        if (!user) throw new Error("Invalid credentials")
        const pass = await bcrypt.compare(password, user.password)
        if (!pass) throw new Error("Invalid credentials");
        const secret = process.env.SECRET
        const token = jwt.sign(payload, secret)
        return { user, token }
    } catch (err) {
        throw new Error(err.message)
    }

}