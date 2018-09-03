const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const reviewSchema = new Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  mentor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Vous devez indiquer un auteur!',
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: 'Vous devez indiquer une activité!',
  },
  text: {
    type: String,
    required: 'Votre commentaire doit avoir un texte!',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },

});

function autopopulate(next) {
  this.populate('mentor');
  next();
}
reviewSchema.pre('find', autopopulate);
reviewSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Review', reviewSchema);
