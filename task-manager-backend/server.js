const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes'); 

// Load environment variables from the .env file
dotenv.config();

// Connect to the MongoDB database using the connection function
connectDB();

const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing to allow API requests from different origins
app.use(express.json()); // Parse incoming JSON payloads for easier data handling
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data from HTTP requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


// Define the main route for the API
app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

// Error handler middleware
app.use(errorHandler);


// Set the port number from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
