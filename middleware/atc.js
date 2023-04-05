const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authenticate = async (req, res, next) => {
    try {
      // Get the JWT token from the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new Error("Authorization header missing");
      }
      const token = authHeader.replace("Bearer ", "");
  
      // Verify the JWT token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.userId;
  
      // Find the user associated with the token
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
  
      // Attach the token and user to the request object
      req.token = token;
      req.user = user;
  
      next();
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  };
  
  module.exports = authenticate;