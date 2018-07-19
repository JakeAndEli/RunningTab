const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const api = require('./server/routes/api.js');
const passport = require('passport');
const https = require('https');
const fs = require('fs');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./server/config/passport')(passport);

// Dist Folder Location
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/user-home', passport.authenticate('jwt', {session: false}), function(req, res) {
  res.json({success: true});
});

app.get('/admin-open-bills', passport.authenticate('jwt', {session: false}), function(req, res) {
  res.json({success: true});
});

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'RunningTab'
};

https.createServer(sslOptions, app).listen(8443, function(){
  console.log("Server is listening on port 8443.");
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
