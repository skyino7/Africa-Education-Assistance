const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");
const bcrypt = require("bcryptjs");


const Register = async (req, res) => {
    try {
        const { username, firstname, lastname, email, password, role } = req.body;

        if (!username || !firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = password;

        const newUser = new UserModel({
            username,
            firstname,
            lastname,
            email,
            password: hashedPassword,
            role
        });

        const data = await newUser.save();
        // console.log(data);
        res.status(201).json({ message: "User Created Successfully", newUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(`Received email: ${email}, password: ${password}`);

        if (!email || !password) {
            console.log('Email or password not provided');
            return res.status(400).json({ success: false, message: "Email and Password are required" });
        }

        const existingUser = await UserModel.findOne({ email });
        // console.log(`Provided email: ${existingUser.email}`);
        // console.log(`Fetched user: ${existingUser}`);

        if (!existingUser) {
            console.log('User not found');
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        const isMatch = await existingUser.comparePassword(password);
        // console.log(`Password match result: ${isMatch}`);
        // console.log(`Hashed password in DB: ${existingUser.password}`);
        // console.log(`Plain text password: ${password}`);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`Generated token: ${token}`);

        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 });

        res.status(200).json({ success: true, message: "Login Successfully", existingUser:{
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role
        }});
    } catch (err) {
        console.log('Error in login process:', err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const CheckUser = async (req, res) => {

    try {

        const user = req.user;
        // console.log("Received User: ", user);
        if(!user) {
            res.status(404).json({message: "User Not Found"});
        }
        res.status(200).json({
            success: true,
            message: 'User Authenticated',
            user: req.user
        });
        console.log("Response: ",res.status(200).json(user))

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
