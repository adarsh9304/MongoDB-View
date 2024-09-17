const mongoose = require("mongoose");

const userViewSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  totalContribution: {
    type: Number,
    required: true,
  },
});

const UserView = mongoose.model('UserView', userViewSchema);

UserView.createCollection({
  viewOn: 'users',
  pipeline: [
    {
      $group: {
        _id: null,
        totalContribution: { $sum: "$contribution" }, 
      }
    }
  ]
});


module.exports = UserView;
