// Libraries
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');

// Configurations
var config = require('./config');

// Routing
var authAPIRoutes = require('./routes/auth').router;
var pollAPIRoutes = require('./routes/poll');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//---------------------------------------------------------------------------------
//                             Add API Routes
//---------------------------------------------------------------------------------

app.use('/api/v1.0/auth', authAPIRoutes);
app.use('/api/v1.0/poll', pollAPIRoutes);

//---------------------------------------------------------------------------------
//                             Connect to MongoDB
//---------------------------------------------------------------------------------

mongoose.connect(config.MONGO_URI);

mongoose.connection.on('open', function() {
  console.log("Connected to Mongoose...");
   
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  console.log(err);
});

//---------------------------------------------------------------------------------
//                             Server Boilerplate
//---------------------------------------------------------------------------------

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

