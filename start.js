require('dotenv').config({ path: 'variables.env' });

const app = require('./server');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on PORT ${server.address().port}`)
})