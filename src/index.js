require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

server.start({}, (deets) => {
  console.log(`Server running on http://localhost:${deets.port}`);
});
