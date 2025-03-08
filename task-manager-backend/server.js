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

// Enable CORS for all origins during development
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
