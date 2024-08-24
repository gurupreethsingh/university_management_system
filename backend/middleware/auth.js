const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get the token from the request headers
  const token = req.header("Authorization");

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, "ecoders_jwt_secret"); // Use your JWT secret

    // Attach user data to request
    req.user = decoded;

    // Proceed to the next middleware/route handler
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
