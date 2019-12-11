const Post = require('./../models/postModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: 'success',
    posts
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    post
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await Post.create(req.body);

  res.status(200).json({
    status: 'success',
    post
  });
});
