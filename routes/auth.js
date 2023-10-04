const express = require("express");
const router = express.Router();
const { User, validateLogin } = require ("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    // Validate the incoming login data against the defined validation rules
    // Function definition shown below
    const { error } = validateLogin(req.body);
    // If there's an error in validation, send a 400 Bad Request response
    if (error) return res.status(400).send(error.details[0].message);

    // Check if a user with the provided email exists in the database
    let user = await User.findOne({ email: req.body.email });

    // If no such user exists, send a 400 Bad Request response indicating an invalid email or password
    if (!user) return res.status(400).send("Invalid email or password.");

    // Use bcrypt to compare the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(
      req.body.password, // User's provided password
      user.password // Hashed password from the database
    );

    // If the passwords don't match, send a 400 Bad Request response indicating an invalid email or password
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    // If the passwords match, generate a JWT for the authenticated user
    const token = jwt.sign(
      { _id: user._id, name: user.name }, // Payload data for the JWT
      process.env.JWT_SECRET // Secret key to sign the JWT
    );

    // Return the generated JWT as a response, which will often be used by the client for further authenticated requests
    return res.send(token);
  } catch (ex) {
    // If there's any other exception during the process, send a 500 Internal Server Error response
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
module.exports = router;
