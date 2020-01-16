const express = require('express')
const router = express.Router();
var User = require('../models/user.js').User;
const bcrypt = require('bcryptjs');

router.post('/registration', function(req,res){
    let loginCheck=req.body.login;
    loginCheck=loginCheck.replace(/[^a-zA-Z0-9]/g, '');
    if(loginCheck!=req.body.login){
        
        res.status(401).send('errorSymbol');
    }else
    
    if(req.body.login.length<5 || req.body.login.length>30){
        res.status(401).send('errorLogin');
    }else
    if(req.body.password.length<5 || req.body.password.length>30){
        res.status(401).send('errorPassword');
    }else{

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
                    var user= new User({
                        login: req.body.login,
                        password: hash
                    })

                user.save(function(err, user, affected){
                    if(err){
                        res.status(401).send('name is already taken');
                    }else{
                        res.status(201).send('User created');
                        console.log(user.login +' user created');
                       
                        req.session.userId = user.id;
                        req.session.userLogin = user.login;
                    }
                                })
        })
    });
    }
});

module.exports = router;