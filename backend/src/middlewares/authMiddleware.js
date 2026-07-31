import jwt from 'jsonwebtoken';

export const protectAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return  res.status(401).json({
                success: false,
                message: 'You do not have access'
            });
        };
        const token = authHeader.split(' ')[1];

        const jwtSecret = process.env.JWT_SECRET;

        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            sucess: false,
            message: 'Invalid or expired token',
            error: err.message
        });
    };

};
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