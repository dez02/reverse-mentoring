const mongoose = require('mongoose');

const Review = mongoose.model('Review');

exports.addReview = async (req, res) => {
  req.body.mentor = req.user._id;
  req.body.course = req.params.id;
  const newReview = new Review(req.body);
  await newReview.save();
  req.flash('success', 'Merci d\'avoir laissé un commentaire!');
  res.redirect('back');
};
