const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const slug = require('slugs');

const courseSchema = new mongoose.Schema({ // Création du Schema
  name: {
    type: String,
    trim: true,
    required: 'please enter a course name!',
  },
  slogan: {
    type: String,
    trim: true,
    required: 'please enter a slogan!',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  date: { type: Date, default: Date.now },
  photo: String,
  domaine: String,
  mentor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Mentor missing',
  },
  sessions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Session',
  }],
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

courseSchema.index({
  name: 'text',
  description: 'text',
});

courseSchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

courseSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'course',
});

module.exports = mongoose.model('Course', courseSchema); // Création du model qui va me permettre d'insérer des données dans mdb en respectant le schema
