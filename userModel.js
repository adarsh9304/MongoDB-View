const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
  },
  contribution: {
    type: Number,
    default: 0, 
  },
});

const User = mongoose.model('user', userSchema);
module.exports={
  User
}
