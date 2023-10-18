const express = require('express');
const app = express();

const multer = require('multer');
const path = require('path');

const profiles = [
    {
        name: 'Dani Munif',
        phone: '081234567890',
    },
    {
        name: 'Ari',
        phone: '086436718889',
    },
    {
        name: 'Budi',
        phone: '085236718889',
    },
];

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/upload')); // -> /upload
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + ' ' + Date.now() + path.extname(file.originalname)); // example -> file-1234567890.jpg
    }
});

app.put('/profile/upload', multer({ storage: diskStorage }).single('photo'), (req, res) => {
    const file = req.file.path;
    console.log(file);
    if (!file) {
        res.status(400).send({
            status: false,
            data: 'No file is selected.'
        });
    }
    profiles[req.query.index].photo = req.file.path;
    res.send(file);
});

app.listen(3000, function () {
    console.log('server running');
});