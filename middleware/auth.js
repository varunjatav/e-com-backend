    import jwt from 'jsonwebtoken';
    import crypto  from 'crypto';
    export const jwtSecret = crypto.randomBytes(64).toString('hex');
    export const refreshtokenSecret = crypto.randomBytes(64).toString('hex');
    export const blackList = [];

    const auth = (req, res, next) => {
       
        // console.log("before",req.userId);
        const token = req.headers.authorization?.split(' ')?.[1];
        console.log("token from auth middleware",token);
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        if (blackList.includes(token)) {
            return res.status(401).json({ message: 'Token is invalid' });
        }

        try {
            // console.log("inside try");
            // console.log("token",token);
            // console.log("jwtSecret",jwtSecret);
            const verify = jwt.verify(token, jwtSecret);
            console.log("after verify");
            console.log(verify);
            req.userId = verify.userId;
            console.log("after",req.userId);
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };

    export default auth;
