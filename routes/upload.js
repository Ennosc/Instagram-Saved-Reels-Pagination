const express = require('express')
const multer = require("multer");
const router = express.Router()
const uploadController = require('../controllers/upload')

const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 50 * 1024 * 1024 }
});

router.post('/createUpload', upload.single("file"), uploadController.createUpload)

module.exports = router