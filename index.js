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
app.use(cors({ origin: "http://localhost:81", credentials: true }));
app.use(cookieParser());
app.use(express.static('uploads'));
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
  console.log("listening on *http://localhost:5000");
});

//routes
app.post("/authorization", routes.authorization);
app.post("/registration", routes.registration);
app.post("/uploadImg", routes.uploadImg);
app.get("/logout", routes.logout);
app.get("/", routes.getUser); 


//chat
require("./libs/chat")(io);
