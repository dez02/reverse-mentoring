const express = require('express');
const routes = require('./routes/index');
const path = require('path');
const errorHandlers = require('./handlers/errorHandlers');
const flash = require('connect-flash');
const session = require('express-session');
const expressValidator = require('express-validator');
const helpers = require('./helpers');
const bodyParser = require('body-parser');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  // course: new MongoCourse({ mongooseConnection: mongoose.connection })
}));
app.use(flash());

// variables locales
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.h = helpers;
  next();
});

app.use('/', routes);
app.use(errorHandlers.notFound);
app.use(errorHandlers.flashValidationErrors);


module.exports = app;
