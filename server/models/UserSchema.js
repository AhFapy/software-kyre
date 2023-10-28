const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can add more fields to the user schema as needed (e.g., email, name, roles, etc.)
  // Additional fields would depend on the requirements of your application.
});

// Create a User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;