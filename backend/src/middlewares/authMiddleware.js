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