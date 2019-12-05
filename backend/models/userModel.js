const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  },
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
  date: {
    type: Date,
    default: Date.now
  },
  passwordChangedAt: { type: Date },
  passwordResetToken: String,
  passwordResetTokenExpires: Date
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

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetTokenExpires = Date.now() + 10 * 60000;

  return resetToken;
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
