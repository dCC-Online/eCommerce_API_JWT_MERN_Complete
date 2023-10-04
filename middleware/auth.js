const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  // Retrieve the token from the request header 'x-auth-token'
  const token = req.header("x-auth-token");

  // If no token is provided, return a 401 Unauthorized response
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    // Verify the provided token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload (typically user details) to the request object for use in other middlewares or routes
    req.user = decoded;

    // Call the next middleware or route handler
    return next();
  } catch (ex) {
    // If token verification fails (e.g., token is tampered with, expired, or simply invalid), return a 400 Bad Request response
    return res.status(400).send("Invalid token.");
  }
}
module.exports = {
    auth
}