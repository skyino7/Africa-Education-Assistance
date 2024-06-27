const DonateBook = require('../models/DonateBook');
const UserModel = require('../models/Users');
const jwt = require('jsonwebtoken');

const bookOwner = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User Not Found' });
        }

        const id = req.params.id;
        const getBooks = await DonateBook.findById(id);

        if (!id) {
            return res.status(404).json({ message: 'Book Not Found' });
        }

        if (user.role === 'admin' || getBooks.userId === user._id.toString()) {
            req.user = user;
            req.getBooks = getBooks;
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized: User not allowed to perform this action' });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = bookOwner;
