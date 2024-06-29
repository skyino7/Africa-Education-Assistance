const UserModel = require('../models/Users');

const GetUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        if (!users) {
            return res.status(404).json({ message: 'No Users Found' });
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(err);
    }
};

const DeleteUser = async (req, res) => {

    try {
        console.log("Received request body:", req.params);

        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        console.log("Token: ", token);

        const userId = req.params.id;
        console.log(`Received request to delete user with ID: ${userId}`);

        const user = await UserModel.findById(userId);
        console.log(`User found: ${user}`);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        if (user.role === 'admin') {
            return res.status(400).json({ message: 'Cannot Delete Admin User' });
        }
        await UserModel.findByIdAndDelete(userId);
        console.log(`User with ID: ${userId} deleted successfully`);

        res.status(200).json({ message: 'User Deleted Successfully' });
    } catch {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(err);
    }

};

module.exports = {GetUsers, DeleteUser};
