var express = require("express");
var app = express();
var mongoose = require("./libs/mongoose");
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var cors = require("cors");
var cookieParser = require("cookie-parser");
var session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://kmuauto.ru", credentials: true }));
app.use(cookieParser());
const routes = require("./routes");

//sesions
app.use(
  session({
    secret: "masik cat",
    //   resave: true,
    //   saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

server.listen(process.env.PORT || 5000, function() {
  console.log("listening on *http://kmuauto.ru:5000");
});

//routes
app.post("/authorization", routes.authorization);
app.post("/registration", routes.registration);
app.post("/uploadImg", routes.uploadImg);
app.get("/logout", routes.logout);
app.get("/chat", routes.chat);
app.get("/", function(req, res) {
  if (req.session.userLogin) {
    res.status(200).send({ login: req.session.userLogin });
  } else {
    res.status(401).send("access error");
  }
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  res.send("error 404");
});

//chat
require("./libs/chat")(io);
