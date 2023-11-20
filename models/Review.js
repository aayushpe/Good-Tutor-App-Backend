const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewNum: {
    type: int,
    required: true
  },
  reviewDescription: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Review', reviewSchema);
