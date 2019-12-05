const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const catchAsync = require('./../utils/catchAsync');

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
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password!'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: { type: Date },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  testPassword,
  userPassword
) {
  return await bcrypt.compare(testPassword, userPassword);
};

userSchema.methods.changedPassword = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    //return true when we changed password after we issued token
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
