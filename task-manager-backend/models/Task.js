// Import mongoose library for interacting with MongoDB
const mongoose = require('mongoose');

// Define a schema for tasks, which represent individual task items in the application
const taskSchema = mongoose.Schema(
  {
    // 'user' field: references the User model to associate a task with a specific user
    user: {
      type: mongoose.Schema.Types.ObjectId, // Stores the unique ObjectId of the user
      required: true, // Task must be associated with a user
      ref: 'User' // Reference to the User model for population
    },
    // 'title' field: the title of the task, which is required
    title: {
      type: String,
      required: [true, 'Please enter a task title'] // Custom error message if title is missing
    },
    // 'description' field: additional details about the task (optional)
    description: {
      type: String
    },
    // 'status' field: indicates the current status of the task
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'], // Allowed values for task status
      default: 'not-started' // Default status when a task is created
    },
    // 'priority' field: specifies the urgency level of the task
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'], // Allowed priority levels
      default: 'medium' // Default priority level
    },
    // 'category' field: categorizes the task (e.g., work, personal) with a default value
    category: {
      type: String,
      default: 'general'
    },
    // 'dueDate' field: indicates when the task is due (optional)
    dueDate: {
      type: Date
    }
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' timestamps to each task document
    timestamps: true
  }
);

// Export the Task model based on the defined schema so it can be used in other parts of the application
module.exports = mongoose.model('Task', taskSchema);
