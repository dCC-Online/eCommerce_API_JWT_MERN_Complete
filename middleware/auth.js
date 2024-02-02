const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send("Access denied. Token is missing.");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Invalid token.");
    }
}

module.exports = { auth };
