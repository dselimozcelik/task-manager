// Import mongoose for MongoDB interaction and bcryptjs for password hashing
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define a schema for the User model
const userSchema = mongoose.Schema(
  {
    // 'name' field: required string with a custom error message if missing
    name: {
      type: String,
      required: [true, 'Please enter a name']
    },
    // 'email' field: required string that must be unique and match a specific regex pattern for email validation
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true, // Ensures that no two users have the same email
      match: [
        // Regular expression to validate the email format
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address'
      ]
    },
    // 'password' field: required string with a minimum length and a custom validator
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [8, 'Password must be at least 8 characters'],
      // Custom validator to ensure password complexity
      validate: {
        validator: function(value) {
          // The regex checks for at least one lowercase letter, one uppercase letter, one number, and one special character.
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return passwordRegex.test(value);
        },
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
      }
    }
  },
  {
    // Automatically include createdAt and updatedAt timestamps in the documents
    timestamps: true
  }
);

// Pre-save middleware that hashes the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  // Check if the password field has been modified; if not, proceed without re-hashing
  if (!this.isModified('password')) {
    next();
  }
  
  // Generate a salt with 10 rounds of processing
  const salt = await bcrypt.genSalt(10);
  // Hash the plain text password using the generated salt and assign it back to the password field
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method for the User model to compare an entered password with the stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Use bcrypt's compare method to check if the entered password matches the hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model based on the defined schema so it can be used in other parts of the application
module.exports = mongoose.model('User', userSchema);
