import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Please enter your name!'] },
    email: { type: String, required: [true, 'Please enter your email!'], validate: validator.isEmail },
    avatar: { type: String },
    password: {
        type: String,
        required: [true, 'Please enter the password!'],
        minLength: [6, "Password should be at least six characters long!"]
    },
    role: { type: String, enum: ['user', 'admin', 'employee'], default: 'user' },
    refreshToken: { type: String },
}, {
    timestamps: true,
})


// hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    return next();
})


//compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


// create access token
userSchema.methods.createAccessToken = function () {
    return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}


// create refresh token of random uuid
userSchema.methods.createRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}


export const User = mongoose.model('User', userSchema);