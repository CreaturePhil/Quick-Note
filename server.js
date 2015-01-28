var chalk = require('chalk');
var express = require('express');
var morgan = require('morgan');
var path = require('path');

var config = require('./config/config');
var routes = require('./config/routes');

var app = express();

/**
 * App configuration
 */

if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}

app.set('port', config.port);

app.use(express.static(path.join(__dirname, 'public')));

// routes setup
app.use('/', routes);

var server = app.listen(app.get('port'), function() {
  var env = '\n[' + chalk.green(app.get('env')) + ']';
  var port = chalk.magenta(server.address().port);
  console.log(env + ' Listening on port ' + port + '...\n');
});