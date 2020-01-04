const Post = require('./../models/postModel');
const Comment = require('./../models/commentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.groupId) filter = { group: req.params.groupId };

  const posts = await Post.find(filter).populate('comments');
  //   {
  //   path: 'comments',
  //   select: '_id'
  // });

  res.status(200).json({
    status: 'success',
    posts
  });
});

exports.userPosts = catchAsync(async (req, res, next) => {
  let filter = req.params.id;
  console.log(req.params.id);
  if (req.params.id) filter = { user: { _id: req.params.id } };

  const posts = await Post.find(filter);
  //   {
  //   path: 'comments',
  //   select: '_id'
  // });

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
    data: { post: post }
  });
});

exports.likePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  // const { userId } = req.body;
  console.log(req.user);
  if (
    post.likes.filter(like => like.user.toString() === req.user._id.toString())
      .length > 0
  ) {
    return res.json({ alreadyliked: 'User already liked this post' });
  }

  post.likes.unshift({ user: req.user._id });
  await post.save();
  res.status(200).json({
    status: 'success',
    post
  });
});

exports.unlikePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (
    post.likes.filter(like => like.user.toString() === req.user._id.toString())
      .length === 0
  ) {
    return res
      .status(400)
      .json({ notliked: 'You have not yet liked this post' });
  }

  // console.log(post.likes);
  // Get remove index
  const removeIndex = post.likes
    .map(item => item.user.toString())
    .indexOf(req.user._id.toString());

  // Splice out of array
  post.likes.splice(removeIndex, 1);

  // Save
  await post.save();

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

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  const { userId } = req.body;

  if (post.user._id.toString() === userId) {
    return res.status(401).json({ notauthorized: 'User not authorized' });
  }
  await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success'
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'comments',
    select: '-__v'
  });
  const { userId } = req.body;
  // Check for post owner
  if (post.user._id.toString() === userId) {
    return res.status(401).json({ notauthorized: 'User not authorized' });
  }
  if (post.comments === undefined || post.comments.length === 0) {
    // Delete
    await post.remove();
  } else {
    post.comments.forEach(
      catchAsync(
        async comment => await Comment.findOneAndRemove({ _id: comment._id })
      )
    );
    await post.remove();
  }
  res.status(200).json({
    status: 'success',
    message: 'deleted'
  });
});
