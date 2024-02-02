const { Schema, model } = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, username: this.username },
        process.env.JWT_SECRET
    );
};

const User = model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(user);
}

function validateLogin(data) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(data);
}

module.exports = { User, validateUser, validateLogin };
