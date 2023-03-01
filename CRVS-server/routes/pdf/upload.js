const express = require('express')
const multer = require('multer')
const fs = require('fs')
const upload = multer({ dest: 'pdf/' })
const router = express.Router({ mergeParams: true })

// import the helper function from helper folder to run the script
const runScript = require('../helper/script_runner');


// /pdf/upload
router.get('/upload', async (req, res) => {
    console.log("Ashtese");
    const data = {
        pageTitle: 'PDF Upload not attempted'
    }
    res.render('playground/success', data);
})

router.post('/upload', upload.single('pdf'), async (req, res) => {

    if (!req.file) {
        // no file was uploaded
        res.status(400).render('error', { message: 'No file was uploaded.' });
        return;
    }

    // get the file name and extension
    const fileName = req.file.originalname;
    const fileExt = fileName.split('.').pop();

    // set the new file name
    const newFileName = `uploaded_${Date.now()}.${fileExt}`;

    // move the uploaded file to the server
    const file = req.file;
    const filePath = `${file.destination}${newFileName}`;
    fs.rename(file.path, filePath, (err) => {
        if (err) {
            // error occurred while saving the file
            console.error(err);
            res.status(500).render('error', { message: 'Error occurred while saving the file.' });
        }
    });
    const data = {
        pageTitle: 'PDF Upload',
        message: "PDF uploaded successfully\n Now processing the file \n got to url /pdf/processed to see the result!",
        pdfFilename: newFileName,
        pdfLocation: filePath
    }
    res.render('pdf/uploadSuccess', data);

    // run the script file
    var command = './teserract_prep.sh';
    runScript(command, newFileName).then((result) => {
        console.log('finished running script');
    }).catch((err) => {
        console.log('error running script');
        console.log(err);
    });
})

// function to get the directory contents of intermediate folder
// router.get('/processed', async (req, res) => {
//     const data = {
//         pageTitle: 'Processed field',
//         message: "",
//         pdfFilename: "test2.pdf",
//         pdfLocation: "pdf/test2.pdf"
//     }
//     res.render('pdf/uploadSuccess', data);
// })

module.exports = router