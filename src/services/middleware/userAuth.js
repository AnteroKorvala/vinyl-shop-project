import jwt from 'jsonwebtoken';

const config = process.env;

const verifyUserToken = (req, res, next) => {
    console.log(arguments[0]);
    const token =
        req.body?.token || req.query?.token || req?.headers["x-access-token"];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        req.user = jwt.verify(token, config.TOKEN_KEY);
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
    return next();
}

export default verifyUserToken;
