const jwt = require('jsonwebtoken');
const UserModel = require('../models/Users');

const IsAdmin = async (req, res, next) => {

    try{
        // console.log(req.headers.authorization);
        // console.log(req.cookies);
        // const token = req.cookies.token;
        // console.log(token);

        const authHeader = req.headers.authorization;

        // Check if Authorization header exists and starts with 'Bearer '
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Extract token from header (remove 'Bearer ' prefix)
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Decoded Token:', decoded);

        const user = await UserModel.findById(decoded.id);

        // Log fetched user for debugging
        // console.log('Fetched User:', user);

        if (!user) {
            return res.status(401).json({ message: 'User Not Found' });
        }

        if (user.role === 'admin') {
            req.user = user;
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized: User not an admin' });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}

const IsUser = async (req, res, next) => {

    try{
        // const token = req.cookies.token;

        // console.log("Headers: ", req.headers.cookie);
        // console.log("Headers: ", req.headers);

        const authHeader = req.headers['authorization'];
        // console.log("Auth Header isUser: ", authHeader);
        let token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            token = req.cookies.token; // Get token from cookie if not in the header
          }

        // console.log("Token isUser: ", token);

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded: ", decoded);
        const user = await UserModel.findById(decoded.id);
        // console.log("User: ", user);

        if (!user) {
            return res.status(401).json({ message: 'User Not Found' });
        }

        if (user.role === 'user') {
            req.user = user;
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized: Not a User' });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}

module.exports = { IsAdmin, IsUser };
