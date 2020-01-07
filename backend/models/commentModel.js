const mongoose = require('mongoose');
const User = require('./userModel');
const Post = require('./postModel');

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comment must belong to user!']
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'Comment must belong to post!']
    },
    text: {
      type: String,
      required: [true, 'Comment must have text!']
    },
    name: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name avatar'
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
