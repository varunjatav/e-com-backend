    import jwt from 'jsonwebtoken';
    import crypto  from 'crypto';
    export const jwtSecret = crypto.randomBytes(64).toString('hex');
    export const refreshtokenSecret = crypto.randomBytes(64).toString('hex');
    export const blackList = [];

    const auth = (req, res, next) => {
        const token = req.headers.authorization?.split(' ')?.[1];
        console.log("token from auth middleware",token);
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        if (blackList.includes(token)) {
            return res.status(401).json({ message: 'Token is invalid' });
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
