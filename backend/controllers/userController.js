const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');

const filterReqBody = (req, ...filters) => {
  const filtered = {};
  Object.keys(req).forEach(el => {
    if (filters.includes(el)) filtered[el] = req[el];
  });
  return filtered;
};

exports.updateDataForAuthUser = catchAsync(async (req, res, next) => {
  if (req.user.password || req.user.confirmPassword) {
    return next(new AppError('You cant change password here!', 400));
  }

  //filter the req body to not allow user to change for example role
  const filter = filterReqBody(req.body, 'name', 'email');

  const user = await User.findByIdAndUpdate(req.user.id, filter, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    user
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: user
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.deleteAccountAdmin = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { active: false });

  res.status(200).json({
    status: 'success',
    data: null
  });
});
exports.unbanAccountAdmin = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { active: true });

  res.status(200).json({
    status: 'success',
    data: null
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  //console.log(req.headers);
  res.status(200).json({
    status: 'success',
    data: users
  });
});
