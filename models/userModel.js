const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors'); // me permet de customiser mes messages d'erreurs côté navigateur
const validator = require('validator'); // make sure the email is a proper validation.
// It takes an array with 2 values. first: how to validate
// second: the error message si on se connecte avec une adresse erronée
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Adresse Email invalide'], // verifie si l'email est valide
    require: "Veuillez rentrer une adresse mail s'il vous plaît",
  },
  name: {
    type: String,
    trim: true,
    require: "Veuillez rentrer un nom s'il vous plaît",
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
