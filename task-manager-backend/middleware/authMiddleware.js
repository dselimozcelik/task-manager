// Import jsonwebtoken for handling JWT and express-async-handler to simplify error handling in async functions
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
// Import the User model to retrieve user data from the database
const User = require('../models/User');

// Define middleware to protect routes by verifying JWT tokens
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the header (e.g., "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key stored in environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Retrieve the user associated with the token, excluding the password field
      req.user = await User.findById(decoded.id).select('-password');

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Log any errors that occur during token verification
      console.error(error);
      // Set the response status to 401 Unauthorized and throw an error
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  // If no token was found in the request header, respond with 401 Unauthorized
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Export the protect middleware so it can be used in other parts of the application
module.exports = { protect };
