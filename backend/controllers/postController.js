const Post = require('./../models/postModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.groupId) filter = { group: req.params.groupId };

  const posts = await Post.find(filter).populate({
    path: 'comments',
    select: '_id'
  });

  res.status(200).json({
    status: 'success',
    posts
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'comments',
    select: '-__v'
  });

  res.status(200).json({
    status: 'success',
    post
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  if (!req.body.group) req.body.group = req.params.groupId;
  if (!req.body.user) req.body.user = req.user._id;

  const post = await Post.create(req.body);

  res.status(200).json({
    status: 'success',
    post
  });
});
