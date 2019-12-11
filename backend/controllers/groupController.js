const Group = require('./../models/groupModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllGroups = catchAsync(async (req, res, next) => {
  const groups = await Group.find();

  res.status(200).json({
    status: 'success',
    data: {
      groups
    }
  });
});

exports.getGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      group
    }
  });
});

exports.createGroup = catchAsync(async (req, res, next) => {
  const newGroup = await Group.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { group: newGroup }
  });
});