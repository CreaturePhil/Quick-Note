var bodyParser = require('body-parser');
var chalk = require('chalk');
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');

var config = require('./config/config');
var routes = require('./config/routes');

var app = express();

/**
 * Connect to MongoDB
 */

mongoose.connect(config.MONGODB);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

/**
 * App configuration
 */

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app.set('port', config.port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// routes setup
app.use('/', routes);

var server = app.listen(app.get('port'), function() {
  var env = '\n[' + chalk.green(app.get('env')) + ']';
  var port = chalk.magenta(server.address().port);
  console.log(env + ' Listening on port ' + port + '...\n');
});