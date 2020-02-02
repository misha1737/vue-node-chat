chat = function(io) {
  var Message = require("../models/message.js").Message;
  var User = require("../models/user.js").User; 
  function spam() {
    letSpamcounter--;
    console.log(letSpamcounter);
  }
  letSpamcounter = 0;
  let users = [];
  let connections = [];

  io.sockets.on("connection", function(socket) {
    let userName;
    let userMessages = 0; //для ігнорування повідомлеть при витягненні з бази
    let mute = false;
    connections.push(socket);
    console.log("Успешное соединение");

    socket.on("disconnect", function(data) {
      console.log("3333")
      connections.splice(connections.indexOf(socket), 1);
        console.log("123")
      let pos = users.indexOf(userName);
      if (pos > -1) {
        users.splice(pos, 1);
        console.log("відключились" + userName);
        userName = data;
        io.sockets.emit("loadUsers", users);
      }
      io.sockets.emit("loadUsers", users);
    });

    socket.on("send mess", function(data) {
      function sendError(err) {
        io.sockets.emit("error", { err });
      }
      //валидация
      if (data.text.length < 1) {
        sendError("message is empty");
        return 0;
      }
      if (data.text.length > 1024) {
        sendError("message is too big");
        return 0;
      }

      if (letSpamcounter > 8) {
        mute = true;
        sendError("too many posts. banned for 60 seconds");
        setTimeout(() => {
          mute = false;
        }, 60000);
        console.log(mute);
      }
      console.log(socket.id);
      if (!userName){
        userName=data.login;
        users.push(userName);
        console.log("підключився:" + data);
        users.push(userName);
        io.sockets.emit("loadUsers", users);
      }
      if (!mute) {
        let time = Date.now();
        var message = new Message({
          login: userName,
          message: data.text,
          time: time
        });
        
        message.save(function(err, message, affected) {
          if (err) {
            console.log(err);
          } else {
            
            letSpamcounter++;

            setTimeout(spam, 10000);

            userMessages++;
            //console.log(userMessages);
          }
        });

        
        User.findOne({login:userName}).then(userData => {
 
        
        io.sockets.emit("add mess", {
          user: userName,
          msg: data.text,
          logoUrl: userData.logoUrl,
          time: Date.now()
        });
        })
      } else {
      }

      // console.log(req.session.userLogin);
    });

    socket.on("user", function(data) {
      console.log("підключився:" + data);
      userName = data;
      //if (users.indexOf(userName != -1)){
      users.push(userName);
      //   }

      io.sockets.emit("loadUsers", users);

      // console.log(req.session.userLogin);
    });
    socket.on("getHistory", function(data) {
      let perPage = 30;
      let page = data;

      Message.find({})
        .sort({ $natural: -1 })
        .limit(perPage)
        .skip(perPage * page + userMessages)
        .then(history => {
          if (!history) {
            console.log("errHisstory");
          } else {
           
            io.sockets.emit("loadHistory", {
              history: history,
              login: userName
            });
          }
        });
    });
    socket.on("getLoginUrl", function(data) {
      
      let namemas=[];
      for(let i in data){
        namemas.push(data[i].name);
      }

    
      User.find({login:{ $in:  namemas } }).then(
        result =>{
          if (!result) {
            console.log("errUserlogin");
        }else{
         let data= []
         
         for(let i=0; i < result.length; i++){
           data.push({
             name:result[i].login,
             logoUrl:result[i].logoUrl
            })
        }
        
          io.sockets.emit("loadLogoUrl", data);
        }

        }
      )

     

    });
    socket.on("writeMessage", function(data) {
        
        io.sockets.emit("writingUser", data.login);
    });
    


  });
};

module.exports = chat;
