import {
    registerUserService,
    loginUserService
} from "../services/authService.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await registerUserService(name, email, password)
        res.status(201).json(user)
    } catch (err) {
        res.send(400).json({
            error: err.message

        })
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUserService(email, password);
        res.status(200).json({ user, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getUserInfo = (req, res) => {
    try {
        res.status(200).json({ user: req.user })
    } catch (err) {
        res.status(400).json({ message: err.message })
    };
}

export const checkOwnership = (Model, paramName = 'id') => async (req, res, next) => {
    try {
        const resourse = await Model.findById(req.params[paramName]);

        if (!resourse) {
            return res.status(404).json({ message: 'Not found' })
        };

        if (req.user.role === 'admin' || resourse.createdBy.toString() === req.user.id) {
            return next()
        }
        return res.status(403).json({ message: 'Not authorized to modify resource' })
    } catch (err) {
        return res.status(400).json(err.message)
    }
};