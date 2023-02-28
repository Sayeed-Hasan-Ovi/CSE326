var express = require('express');
var router = express.Router();

// import the runScript function from script_runner.js in the helper folder
const runScript = require('../helper/script_runner');

/* GET home page. */
router.get('/', function(req, res, next) {
  // build the shell equivalent command for the script
  var command = './teserract_prep.sh';  
  // call the runScript function for testing
  // if the script runs successfully, 
  // print 'finished running script' to the console
  // redirect to final page
  runScript(command, 'test2.pdf').then((result) => {
    console.log('finished running script');
    // todo : try to figure out a process of redirecting to final page
    // res.redirect('/final');
  }).catch((err) => {
    console.log('error running script');
    console.log(err);
  });
  res.render('index', { title: 'CRVS form Uploader!' });
});

module.exports = router;
