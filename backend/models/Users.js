const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 60
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {timestamps: true});

userSchema.pre('save', async function(next) {

    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }

});

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
