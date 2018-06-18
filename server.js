const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
// Application configuration
const app = express();
// Route configuration
const api = require('./server/routes/api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set our api routes
app.use('/api', api);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000.");
});
