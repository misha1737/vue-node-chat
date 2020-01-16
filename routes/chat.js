const express = require('express')
const router = express.Router();
//var server = require('./../libs/server');
// var io = require('socket.io').listen(5000);

router.get('/chat', function(req,res){
    res.sendFile(__dirname+'/chat.html');
    


});

module.exports = router;




