const express = require('express')
const multer = require('multer')
const fs = require('fs')
const upload = multer({ dest: 'pdf/' })
const router = express.Router({ mergeParams: true })


// /pdf/upload
router.get('/', async (req, res) => {
    console.log("Ashtese");
    const data = {
        pageTitle: 'PDF Upload not attempted'
    }
    res.render('playground/success', data);
})

router.post('/', upload.single('pdf'), async (req, res) => {
    
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
        pageTitle: 'PDF Upload Attempted',
        message: "PDF uploaded successfully",
        pdfFilename: newFileName,
        pdfLocation: filePath
    }
    res.render('pdf/uploadSuccess', data);
})

module.exports = router