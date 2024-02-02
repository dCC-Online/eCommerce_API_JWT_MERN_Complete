const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser, validateLogin } = require("../models/user");

router.post("/register", async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send("Invalid registration data.");
        }

        let user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).send("User already registered.");
        }

        const salt = await bcrypt.genSalt(10);

        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
        });
        await user.save();

        const token = user.generateAuthToken();

        res.status(201)
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send({
                _id: user._id,
                username: user.username,
                email: user.email,
            });
    } catch (error) {
        res.status(500).send(`Internal Server Error ${error}`);
    }
});

router.post("/login", async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).send("Invalid login data.");
    }

    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).send("No user found with provided username.");
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    if (!validPassword) {
        return res.status(400).send("Invalid Password.");
    }

    const token = user.generateAuthToken();

    res.status(201)
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send({ message: "Login successful." });
});

module.exports = router;
