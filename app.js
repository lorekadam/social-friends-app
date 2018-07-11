import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import errorHandler from 'errorhandler';
import path from 'path';
import jwt from 'jsonwebtoken';
import config from './config/config';
import msg from './helpers/messages';
import expressGraphQL from 'express-graphql';
import { ApolloServer } from 'apollo-server-express';

/**
 * SCHEMA
 */

import { schema } from './schema/schema';

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Create Express server.
 */
const app = express();

/**
 * Use GraphQL
 */

const server = new ApolloServer({
  schema
});

server.applyMiddleware({ app });

app.use(
  '/ql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI,
  {
    auth: {
      user: process.env.MONGODB_USER || '',
      password: process.env.MONGODB_PASSWORD || ''
    }
  }
);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * JWT middleware
 */

app.use(function (req, res, next) {
  const excludedPaths = ['/api/register', '/api/login', '/api/refreshToken', '/graphql'];
  if (excludedPaths.indexOf(req.path) !== -1) {
    next();
  } else {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.secret, (jwtErr, decoded) => {
        if (jwtErr) {
          if (jwtErr.name === 'TokenExpiredError') {
            return res.json({ success: false, expired: true });
          }
          return res.json({ success: false, message: msg.auth.token.failed });
        }
        req.userId = decoded.id;
        next();
      });
    } else {
      return res.status(403).send(msg.auth.token.noToken);
    }
  }
});

/**
 * Start Express server.
 */

app.listen(app.get('port'), () => {
  console.log(`Apollo server on: ${server.graphqlPath}`);
  console.log('App is running at http://localhost:', app.get('port'), 'in', app.get('env'));
  console.log('Press CTRL-C to stop\n');
});

/**
 * Error handler
 */

app.use(errorHandler());

/**
 * Routes
 */

app.use(require('./routes/home'));

app.use(require('./routes/api'));

module.exports = app;
