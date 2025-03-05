// Import the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the connection string stored in MONGO_URI environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Log a success message with the host name of the connected database
    console.log(`MongoDB connection success: ${conn.connection.host}`);
  } catch (error) {
    // Log any error message if the connection fails
    console.error(`Error: ${error.message}`);
    // Exit the process with a failure code (1) if unable to connect
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
