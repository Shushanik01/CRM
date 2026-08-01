import {
    registerUserService,
    loginUserService
} from "../services/authService.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const { user, token } = await registerUserService(name, email, password)
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 18 * 60 * 60 * 1000 })
        res.status(201).json({ user });
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUserService(email, password);
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: 18 * 60 * 60 * 1000 })
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    };
};

export const getUserInfo = (req, res) => {
    try {
        res.status(200).json({ user: req.user })
    } catch (err) {
        res.status(400).json({ message: err.message })
    };
}

export const logoutUser = (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "lax" })
    res.status(200).json({ message: "Logged out successfully" })
}

