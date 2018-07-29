const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const sessionSchema = new mongoose.Schema({
  date: Date,
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: 'Course missing',
  },
  mentoree: {
    type: mongoose.Schema.ObjectId,
    ref: ' User',
  },
});

module.exports = mongoose.model('Session', sessionSchema);

