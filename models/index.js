const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.load({ path: '.env' });

const sequelize = new Sequelize(process.env.PGSTRING, {
  dialect: 'postgres'
});

const models = {
  User: sequelize.import('./UserPG'),
  Notification: sequelize.import('./Notification'),
  Friend: sequelize.import('./Friend'),
  Competition: sequelize.import('./Competition')
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
