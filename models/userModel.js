const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Without name we wont know who you are !']
  },
  email: {
    type: String,
    required: [true, 'Please provide youe email!'],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, 'Please correct your email!']
  },
  avatar: String,
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password!']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;
