var express = require('express');
var router = express.Router();

// import the runScript function from script_runner.js in the helper folder
const runScript = require('../helper/script_runner');

/* GET home page. */
router.get('/', function(req, res, next) {  
  // call the runScript function for testing
  runScript('../../teserract_prep.sh', 'test2.pdf')
    .then(() => console.log('finished running script'))
    .catch((err) => console.error(err));
  res.render('index', { title: 'CRVS form Uploader!' });
});

module.exports = router;
