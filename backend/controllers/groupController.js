const Group = require('./../models/groupModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');

exports.getAllGroups = catchAsync(async (req, res, next) => {
  const groups = await Group.find().populate(
    'posts'
    //{
    //   path: 'posts',
    //   select: '_id'
    // }
  );
  // console.log(groups);
  res.status(200).json({
    status: 'success',
    data: {
      groups
    }
  });
});

exports.getGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.id).populate('posts');
  const topGroups = await Group.find();
  res.status(200).json({
    status: 'success',
    data: {
      group,
      topGroups
    }
  });
});

exports.getUserGroups = catchAsync(async (req, res, next) => {
  let filter = req.params.id;
  // console.log(req.params.id);
  if (req.params.id) filter = { members: { _id: req.params.id } };
  const groups = await Group.find(filter);

  res.status(200).json({
    status: 'success',
    data: {
      groups
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

exports.getMembers = catchAsync(async (req, res, next) => {
  const group = await Group.find();

  res.status(200).json({
    status: 'success',
    data: { group }
  });
});

exports.addDog = catchAsync(async (req, res, next) => {
  const { id, groupName } = req.body;

  const group = await Group.findById(id);
  const user = await User.findById(req.user._id); // const { userId } = req.body;

  if (
    group.members.filter(
      member => member._id.toString() === req.user._id.toString()
    ).length > 0
  ) {
    return res.json({ alreadyAdded: 'User already added this group' });
  }

  group.members.unshift(req.user._id);

  // console.log(group);
  // console.log(req.user._id);

  // user.dogs.breed.unshift(groupName);
  // console.log(user);
  await group.save();
  // await user.save();
  res.status(200).json({
    status: 'success',
    group
  });
});

exports.removeDog = catchAsync(async (req, res, next) => {
  const { id, groupName } = req.body;
  const group = await Group.findById(id);
  const user = await User.findById(req.user._id); // const { userId } = req.body;

  if (
    group.members.filter(
      member => member._id.toString() === req.user._id.toString()
    ).length === 0
  ) {
    return res
      .status(400)
      .json({ notAdded: 'You have not been yet added this group' });
  }

  const removeIndex = group.members
    .map(item => item._id.toString())
    .indexOf(req.user._id.toString());

  group.members.splice(removeIndex, 1);

  // const removeIndexUser = user.dogs
  //   .map(item => item.user.toString())
  //   .indexOf(group.name.toString());

  // user.dogs.splice(removeIndexUser, 1);

  await group.save();
  // await user.save();

  res.status(200).json({
    status: 'success'
  });
});
