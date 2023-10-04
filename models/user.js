const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt")
const userSchema = new Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: { type: String, required: true, maxlength: 1024, minlength: 5 },
});

const User = model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
}

const registerUser = async (body) => {
  const salt = await bcrypt.genSalt(10);
  try {
    let user = new User({
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, salt),
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};
function validateLogin(req) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(req);
  }
module.exports = {
  User,
  validateUser,
  registerUser,
  validateLogin
};
