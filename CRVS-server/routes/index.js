var express = require('express');
var router = express.Router({mergeParams: true});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



var pdfUploadRouter = require('./pdf/upload');
// set up sub routers
router.use('/pdf/upload', pdfUploadRouter);


router.get('*', (req, res) => {
  const data = {
    pageTitle: '404',
    message: 'Page not found'
  }
  res.status(400).render('error', data)
})

module.exports = router;
