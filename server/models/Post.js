const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 120 },
  imageURL: { type: String }, // Optional
  content: { type: String, required: true, minlength: 50 },
  username: { type: String, required: true }, // As per spec
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // For security checks
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);