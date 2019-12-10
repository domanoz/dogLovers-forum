const mongoose = require('mongoose');
const User = require('./userModel');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Group must have a name !'] },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  posts: [
    {
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    }
  ]
});

const Group = new mongoose.model('Group', groupSchema);

module.exports = Group;
