const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  dateCreated: { type: Date, default: new Date() },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  title: { type: String, required: true },
  content: [
    {
      title: { type: String },
      content: { type: String, required: true },
    },
  ],
  photo: { type: String, default: null },
  tags: { type: String, default: null },
  views: { type: Number, default: 0 },
});

module.exports = mongoose.model('Article', articleSchema);
