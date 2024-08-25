const jwt = require("jsonwebtoken");
const Teacher = require("../models/TeacherModel"); // Assuming you want to authenticate a teacher

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Teacher.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(404).json({ message: "User not found." });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticateToken;
