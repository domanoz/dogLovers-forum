const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  //console.log(req.headers);
  res.status(200).json({
    status: 'success',
    data: users
  });
});
