const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const slug = require('slugs');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'please enter a course name!',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  date: Date,
  photo: String,
  mentor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a mentor',
  },
});

courseSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model('Course', courseSchema);
