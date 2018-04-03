var environment = process.env.NODE_ENV || 'LOCAL';
if (environment !== 'LOCAL') {
  require("./config/env");
}

var express = require("express");
var bp = require("body-parser");
var cors = require("cors");


require("./db/mlab-config");

var port = process.env.PORT || 3000;
var session = require("./auth/session");
var authRoutes = require("./auth/authRoutes");
var userRoutes = require("./routes/userRoutes");
var projectRoutes = require("./routes/projectRoutes");
var trackRoutes = require("./routes/trackRoutes");
var mailRoutes = require("./routes/mailRoutes");

var whitelist = ["http://localhost:8080", "https://beatlocker.herokuapp.com/"];
var corsOptions = {
  origin: function(origin, callback) {
    var originIsWhiteListed = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhiteListed);
  },
  credentials: true
};

let app = express(); // Create an instance of Express to serve REST resources (e.g. CRUD actions using 'api' endpoints)
let server = require("http").createServer(app); // Create an http server for socket.io

app.use(cors(corsOptions));
app.use(session);
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/../www/dist"));

app.use(authRoutes);
app.use(mailRoutes.router);

app.use("/api/*", (req, res, next) => {
  if (req.method.toLowerCase() !== "get" && !req.session.uid) {
    return res.status(401).send({ error: "PLEASE LOG IN TO CONTINUE" });
  }
  next();
});

app.use(userRoutes.router);
app.use(projectRoutes.router);
app.use(trackRoutes.router);

app.use("*", (err, req, res, next) => {
  res.status(400).send(err);
});

let io = require("socket.io")(server); // Set up socket.io with its http server

io.on("connection", socket => {
  console.log("user connected");
  socket.emit("CONNECTED", {
    socket: socket.id,
    message: 'Successfully connected to socket'
  });
});

server.listen(port, () => {
  console.log("Server running on port: ", port);
});
