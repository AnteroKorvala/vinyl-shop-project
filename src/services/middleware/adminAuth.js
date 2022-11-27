import jwt from 'jsonwebtoken';

const config = process.env;

const verifyAdminToken = (req, res, next) => {
    const token =
        req.body?.token || req.query?.token || req?.headers["x-access-token"];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        req.user = jwt.verify(token, config.TOKEN_KEY);
        if (!req.user.admin) {
            return res.status(403).send('Not authorized');
        }
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
    return next();
}

export default verifyAdminToken;