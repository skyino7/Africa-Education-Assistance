const jwt = require('jsonwebtoken');
const UserModel = require('../models/Users');

const IsAdmin = async (req, res, next) => {

    try{
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId);
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
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId);
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
