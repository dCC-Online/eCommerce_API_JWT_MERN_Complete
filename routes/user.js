const express = require("express");
const router = express.Router();
const { validateUser, User, registerUser } = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    // Validate the incoming user data against the defined validation rules
    // Function definition shown below
    const { error } = validateUser(req.body);
    // If there's an error in validation, send a 400 Bad Request response
    if (error) return res.status(400).send(error.details[0].message);

    // Check if a user with the provided email already exists in the database
    let user = await User.findOne({ email: req.body.email });
    // If such a user exists, send a 400 Bad Request response stating that the user is already registered
    if (user) return res.status(400).send("User already registered.");

    // Send request's body into a registerUser function to handle saving the user to the database
    user = await registerUser(req.body);
    // Save the new user to the database
    await user.save();

    // Generate a JWT for the newly registered user
    const token = jwt.sign(
      { _id: user._id, name: user.name }, // Payload data for the JWT
      process.env.JWT_SECRET // Secret key to sign the JWT
    );

    // Return the new user's data and the JWT as a response
    // The 'x-auth-token' header is commonly used to send back JWTs
    return (
      res
        .header("x-auth-token", token)
        // The 'access-control-expose-headers' is set to ensure that the client-side can read the custom x-auth-token header
        .header("access-control-expose-headers", "x-auth-token")
        .send({ _id: user._id, name: user.name, email: user.email })
    );
  } catch (ex) {
    // If there's any other exception during this process, send a 500 Internal Server Error response
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
