const express = require('express');
const routes = require('./routes/index');
const path = require('path');
const errorHandlers = require('./handlers/errorHandlers');
const flash = require('connect-flash');
const session = require('express-session');
const expressValidator = require('express-validator');
const helpers = require('./helpers');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');

require('./handlers/passport');

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
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// variables locales accessible dans mes vues
app.use((req, res, next) => {
  res.locals.flashes = req.flash(); // res.locals: les props st valables uniqm pdt la durée de vie de la req
  res.locals.h = helpers;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.use('/', routes);
app.use(errorHandlers.notFound);
app.use(errorHandlers.flashValidationErrors);


module.exports = app;
