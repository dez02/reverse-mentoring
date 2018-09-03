const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// Database Connection
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // dis à mongoose d'utiliser ES6
mongoose.connection.on('error', (err) => {
  console.log(`${err.message}`);
});

// Import models
require('./models/courseModel');
require('./models/userModel');
require('./models/sessionModel');
require('./models/reviewModel');


// Start my app
const app = require('./server');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on PORT ${server.address().port}`);
});
