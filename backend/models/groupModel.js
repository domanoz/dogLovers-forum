const mongoose = require('mongoose');
const User = require('./userModel');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Group must have a name !'] },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
});

groupSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'members',
    select: '-__v -passwordChangedAt'
  });
  next();
});

const Group = new mongoose.model('Group', groupSchema);

module.exports = Group;
