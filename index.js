var express = require('express');
var app = express();
var mongoose = require('./libs/mongoose');
// var server = require('./libs/server');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var cors = require('cors');
// var app=server;
var cookieParser = require('cookie-parser')
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(bodyParser.json())
 app.use(cors(
{origin: 'http://kmuauto.ru',
 credentials: true,
},
));
app.use(cookieParser())
const routes = require('./routes');

  


//sesions

app.use(session({
    secret: 'masik cat',
 //   resave: true,
 //   saveUninitialized: false,
    store: new MongoStore({
            mongooseConnection: mongoose.connection
    })
  }))

  const path = require('path');
  var multer  = require('multer');
  var fs = require('fs');
  var dirname='uploads/upl'
  const storage = multer.diskStorage({
      destination:(req,file,cb)=>{
  
          try {
              fs.statSync(dirname);
              console.log('file or directory exists');
          }
          catch (err) {
            if (err.code === 'ENOENT') {
              fs.mkdirSync(dirname);
              console.log('file or directory does not exist');
            }
          }
  
  
          cb(null,dirname);
      },
      filename:(req,file,cb)=>{
          console.log(file.originalname);
          cb(null, Date.now() + path.extname(file.originalname))
      }
  });
  
  const upload =multer({
      storage,
      limits: { fileSize: 10 *1024*1024},
      fileFilter:(req,file,cb) => {
          const ext = path.extname(file.originalname);
          
          if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg'){
              const err = new Error('Extention');
              err.code = 'EXTENTION';
              return cb(err);
          }
          cb(null, true);
      }
  }).single('filedata');


  server.listen((process.env.PORT || 5000), function(){
    console.log('listening on *http://kmuauto.ru:5000');
  });

//routes
app.post('/authorization', routes.authorization);
app.post('/registration', routes.registration);
app.post('/uploadImg',  function(req, res, next){
  upload(req, res, err =>{
      if (err){
       if (err.code==='LIMIT_FILE_SIZE'){
          res.send('Файл дуже великий');
      }else
      if(err.code==='EXTENTION'){
          res.send('невірний формат');
      }
  }else{
      res.send('ok');
  }
  })

});
app.get('/logout', routes.logout);
app.get('/chat', routes.chat);

app.get('/', function(req,res){
  
  if(req.session.userLogin)
  {
    res.status(200).send({login:req.session.userLogin});  
  }else{

    res.status(401).send('access error');  
  };
  
  
});

app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    res.send('error 404');

});


//chat
var someFunv = require('./libs/chat');
chat(io);



