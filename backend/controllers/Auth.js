const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");
const bcrypt = require("bcrypt");

const Register = async (req, res) => {
    try {
        const { username, firstname, lastname, email, password } = req.body;

        if (!username || !firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new UserModel({
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User Created Successfully", newUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const Login = async(req, res) => {

    try {

        const { email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User Not Found"});
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 });

        res.status(200).json({ success: true, message: "Login Successfully", existingUser, token})

    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log(err);
    }

}

const CheckUser = async (req, res) => {

    try {

        const user = req.user;
        if(!user) {
            res.status(404).json({message: "User Not Found"});
        }
        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({message: "Internal Server Error"});
        console.log(err);
    }

}

const Logout = async (req, res) => {

    try {
        res.clearCookie('token');
        res.status(200).json({message: "User Logout Successfully"});
    } catch (err) {
        res.status(500).json({message: "Interval Server Error"});
        console.log(err);
    }

}

module.exports = {Register, Login, CheckUser, Logout}
