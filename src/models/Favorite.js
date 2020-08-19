const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
});

module.exports = mongoose.model('Favorite', favoriteSchema);
