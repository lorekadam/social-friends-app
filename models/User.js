const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;

const validations = require('../helpers/validations');
const msg = require('../helpers/messages');

const users = [
  { id: '1', username: 'Adam', email: '21312' },
  { id: '2', username: 'Adam2', email: '21312' }
];

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
    validate: {
      validator: (username) => validations.username(username),
      message: msg.auth.username
    }
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    validate: {
      validator: (email) => validations.email(email),
      message: msg.auth.email
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: (password) => password.length > 3,
      message: msg.auth.password
    }
  },
  active: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        email: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        User.findOne({ email: args.email }, (err, user) => {
          console.log(user);
          return user;
        });
      }
    }
  }
});

module.exports.User = User;
module.exports.schema = new GraphQLSchema({
  query: RootQuery
});
