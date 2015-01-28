var chalk = require('chalk');
var errorhandler = require('errorhandler');
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

/**
 * Error handlers
 */

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(errorhandler());
}

// production error handler
// no stacktraces leaked to user
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, 'public/app/views/error.html'));
  });
}

var server = app.listen(app.get('port'), function() {
  var env = '\n[' + chalk.green(app.get('env')) + ']';
  var port = chalk.magenta(server.address().port);
  console.log(env + ' Listening on port ' + port + '...\n');
});