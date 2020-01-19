chat = function(io) {
  var Message = require("../models/message.js").Message;
  function spam() {
    letSpamcounter--;
    console.log(letSpamcounter);
  }
  letSpamcounter = 0;
  let users = [];
  let connections = [];

  {
  }

  io.sockets.on("connection", function(socket) {
    let userName;
    let userMessages = 0; //для ігнорування повідомлеть при витягненні з бази
    let mute = false;
    connections.push(socket);
    console.log("Успешное соединение");

    socket.on("disconnect", function(data) {
      connections.splice(connections.indexOf(socket), 1);

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
      if (data.length < 1) {
        sendError("message is empty");
        return 0;
      }
      if (data.length > 1024) {
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
      if (!mute) {
        let time = Date.now();
        var message = new Message({
          login: userName,
          message: data,
          time: time
        });

        message.save(function(err, message, affected) {
          if (err) {
            console.log(err);
          } else {
            console.log("new Message");
            letSpamcounter++;

            setTimeout(spam, 10000);

            userMessages++;
            //console.log(userMessages);
          }
        });

        io.sockets.emit("add mess", {
          user: userName,
          msg: data,
          time: Date.now()
        });
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
  });
};

module.exports = chat;
