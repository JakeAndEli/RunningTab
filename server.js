const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const api = require('./server/routes/api.js');
const passport = require('passport');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./server/config/passport');

app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000.");
});



// Database Configuration
var dbConfig = require("./server/config/database-config.js");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function(){
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

mongoose.connection.once('open', function(){
  console.log("Successfully connected to the database.");
});
