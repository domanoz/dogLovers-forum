const mongoose = require('mongoose');
const User = require('./userModel');
const Group = require('./groupModel');

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
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User'
        },
        text: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        avatar: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
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

postSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name'
  });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
