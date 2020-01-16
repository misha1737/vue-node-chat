const express = require('express')
const router = express.Router();
//var server = require('./../libs/server');
// var io = require('socket.io').listen(5000);
var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })


router.get('/uplLogo', function(req,res){
    res.sendFile(__dirname+'/upl.html');

});

router.post('/uplLogo', upload.single('avatar'), function (req, res, next) {
    // req.file - файл `avatar`
    // req.body сохранит текстовые поля, если они будут
    console.log(req);
  })

module.exports = router;

