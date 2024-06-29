const SchoolBuilding = require('../models/SchoolBuilding');
const UserModel = require('../models/Users');
const jwt = require('jsonwebtoken');

const schoolOwner = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const campaignId = req.params.id;
        console.log("Building Id: ", campaignId);
        const campaign = await SchoolBuilding.findById(campaignId);
        console.log("Building: ", campaign);

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        console.log("Campaign User Id: ", campaign.userId);
        console.log("Logged in User Id: ", user._id);
        if (!campaign.userId) {
            return res.status(500).json({ message: 'Campaign does not have a userId' });
        }

        if (user.role === 'admin' || campaign.userId.toString() === user._id.toString()) {
            req.user = user;
            req.campaign = campaign;
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized: User not allowed to perform this action of School Building' });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = schoolOwner;
