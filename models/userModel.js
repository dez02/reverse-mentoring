const mongoose = require('mongoose');
const md5 = require('md5');
const validator = require('validator'); // make sure the email is a proper validation.
// It takes an array with 2 values. first: how to validate
// second: the error message si on se connecte avec une adresse erronée
const mongodbErrorHandler = require('mongoose-mongodb-errors'); // me permet de customiser mes messages d'erreurs côté navigateur
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;


const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Adresse Email invalide'], // verifie si l'email est valide
    required: "Veuillez rentrer une adresse mail s'il vous plaît",
  },
  name: {
    type: String,
    trim: true,
    required: "Veuillez rentrer un nom s'il vous plaît",
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
  isMentor: {
    type: Boolean,
    default: false,
  },
});

userSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=50`;
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);


// store passw in the bdd with passport
