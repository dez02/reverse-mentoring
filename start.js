// const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// Database Connection
// mongoose.connect(process.env.DATABASE);
// mongoose.Promise = global.Promise;
// mongoose.connection.on('error', (err) => {
//   console.log(`${err.message}`);
// });

// // Import models
// require('./models/course');


const app = require('./server');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on PORT ${server.address().port}`);
});
