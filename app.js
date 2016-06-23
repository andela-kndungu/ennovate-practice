const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  router = require('./server/router'),
  port = process.env.NODE_PORT || 8000,
  ip = process.env.NODE_IP || 'localhost';

// Set up bodyParser to get passed parameters and post bodies as objects
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Handle all routes
router(app);

// Start receiving requests
app.listen(port, ip, function() {
  console.log('Listening on port ' + port);
});

