require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const jwt = require('jsonwebtoken');
const db = require('./db');

const server = createServer();

server.express.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const { userId } = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.APP_SECRET
    );
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

server.start({}, (deets) => {
  console.log(`Server running on http://localhost:${deets.port}`);
});
