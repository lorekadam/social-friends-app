require('dotenv').config({ path: 'variables.env' });
const jwt = require('jsonwebtoken');
const createServer = require('./createServer');

const server = createServer();

server.express.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token && token.length > 0) {
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
