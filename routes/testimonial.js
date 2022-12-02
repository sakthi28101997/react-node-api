const express = require("express");
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
});

router.post('/store', upload.single('photo'), testimonialController.store);
router.get('/list', testimonialController.list);
router.get('/view/:id', testimonialController.view);
router.post('/edit/:id', upload.single('photo'), testimonialController.edit);
router.delete('/delete/:id', testimonialController.delete);


module.exports = router;