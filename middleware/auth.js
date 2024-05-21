import jwt from 'jsonwebtoken';
import crypto  from 'crypto';
export const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log(jwtSecret);

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default auth;
