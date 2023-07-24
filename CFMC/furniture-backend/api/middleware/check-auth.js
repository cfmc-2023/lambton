const jwt = require("jsonwebtoken");
const token = require("../services/userService");
const response = require("../utility/helpers");

exports.tokenVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "maheshvar@233");
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};