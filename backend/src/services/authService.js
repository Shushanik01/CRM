import User from "../models/Users.js";
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
            newUser.password = undefined
            return newUser
        }

    } catch (err) {
        throw new Error(err.message)
    }

};

export const loginUserService = async (email, password) => {
    try {
        const user = await User.findOne({ email }).select('+password')
        if (!user) throw new Error("Invalid credentials")
        const pass = await bcrypt.compare(password, user.password)
        if (!pass) throw new Error("Invalid credentials");
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        }
        const secret = process.env.JWT_SECRET
        const token = jwt.sign(payload, secret)
        user.password = undefined
        return { user, token }
    } catch (err) {
        throw new Error(err.message)
    }

}