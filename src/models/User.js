const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  about: { type: String, default: null },
  photo: { type: String, default: null },
});

module.exports = mongoose.model('User', userSchema);
