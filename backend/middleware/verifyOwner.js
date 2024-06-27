const BookCampaign = require('../models/BookCampaign');
const UserModel = require('../models/Users');
const jwt = require('jsonwebtoken');

const verifyOwner = async (req, res, next) => {
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

        const campaignId = req.params.id;
        const campaign = await BookCampaign.findById(campaignId);

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign Not Found' });
        }

        if (user.role === 'admin' || campaign.userId === user._id.toString()) {
            req.user = user;
            req.campaign = campaign;
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized: User not allowed to perform this action' });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = verifyOwner;
