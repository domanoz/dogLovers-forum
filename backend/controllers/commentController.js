const Comment = require('./../models/commentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createComment = catchAsync(async (req, res, next) => {
  if (!req.body.post) req.body.post = req.params.postId;
  if (!req.body.user) req.body.user = req.user._id;

  const comment = await Comment.create(req.body);

  res.status(201).json({ status: 'success', comment });
});

exports.getComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { comment: comment }
  });
});
exports.updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  const { userId } = req.body;

  if (comment.user._id.toString() === userId) {
    return res.status(401).json({ notauthorized: 'User not authorized' });
  }
  await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success'
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);
  const { userId } = req.body;
  // Check for post owner
  // console.log(comment);
  if (comment.user._id.toString() === userId) {
    return res.status(401).json({ notauthorized: 'User not authorized' });
  }

  // Delete
  await comment.remove();

  res.status(200).json({
    status: 'success',
    message: 'comment deleted'
  });
});
