var express = require('express');
var router = express.Router({ mergeParams: true });


/* GET home page. */
router.get('/', function (req, res, next) {
  // build the shell equivalent command for the script
  var command = './teserract_prep.sh';
  // call the runScript function for testing

  // runScript(command, 'test2.pdf')
  //   .then(() => console.log('finished running script'))
  //   .catch((err) => console.error(err));
  res.render('index', { title: 'CRVS form!' });
});



var pdfUploadRouter = require('./pdf/upload');
// set up sub routers
router.use('/pdf', pdfUploadRouter);


router.get('*', (req, res) => {
  const data = {
    pageTitle: '404',
    message: 'Page not found'
  }
  res.status(400).render('error', data)
})

module.exports = router;
