var config = {};

config.port = process.env.PORT || 3000;

config.MONGODB = process.env.PORT || 'mongodb://localhost:27017/qn';

config.tokenSecret = process.env.TOKEN || 'This is a secret! shhhh';

module.exports = config;