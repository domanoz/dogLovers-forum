const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');

exports.updateDataForAuthUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (req.user.password || req.user.confirmPassword) {
    return next(new AppError('You cant change password here!', 400));
  }
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  //console.log(req.headers);
  res.status(200).json({
    status: 'success',
    data: users
  });
});
