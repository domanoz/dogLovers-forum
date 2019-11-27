const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  });

  const token = jwt.sign({ id: newUser._id }, proccess.env.JWT_SECRET, {
    expiresIn: proccess.env.JWT_EXPIRES_IN
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }
  //check if user exists
  const user = await User.findOne({ email });
});
