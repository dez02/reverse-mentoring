const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const app = express();

app.use('/', routes);

module.exports = app;