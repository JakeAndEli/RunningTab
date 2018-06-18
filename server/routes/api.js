const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send('api works');
});

// Catch all other routes and return no page found
router.get('*', function(req, res) {
  res.send("No page found");
});

module.exports = router;
