const mongoose = require('mongoose');
const User = require('./userModel');
const Group = require('./groupModel');
const Comment = require('./commentModel');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Post must be created by someone!']
    },
    group: {
      type: mongoose.Schema.ObjectId,
      ref: 'Group',
      required: [true, 'Post must have group']
    },
    title: {
      type: String,
      required: [true, 'Post needs title!']
    },
    text: {
      type: String,
      required: [true, 'Post must have text!']
    },
    avatar: {
      type: String
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        }
      }
    ],
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

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id'
});

postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name'
  });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
