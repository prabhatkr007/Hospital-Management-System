const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    // Get the JWT token from the request header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user associated with the token
    const user = await User.findOne({ _id: decodedToken._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    // Attach the token and user to the request object
    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = authenticate;
