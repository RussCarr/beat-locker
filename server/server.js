var express = require('express');
var bp = require('body-parser')
var cors = require('cors')
var server = express();
require('./db/mlab-config')

var port = process.env.PORT || 3000
var session = require("./auth/session")
var authRoutes = require("./auth/authRoutes")
var userRoutes = require("./routes/userRoutes")
var projectRoutes = require("./routes/projectRoutes")
var trackRoutes = require("./routes/trackRoutes")


var whitelist = ['http://localhost:8080'];
var corsOptions = {
    origin: function(origin, callback) {
        var originIsWhiteListed = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhiteListed);
    },
    credentials: true
}

server.use(cors(corsOptions));
server.use(session);
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));

server.use(express.static(__dirname + "/../www/dist"))

server.use(authRoutes);

server.use("/api/*", (req, res, next) => {
    if (req.method.toLowerCase() !== "get" && !req.session.uid) {
        return res.status(401).send({ error: "PLEASE LOG IN TO CONTINUE" });
    }
    next()
})

server.use(userRoutes.router)
server.use(projectRoutes.router)
server.use(trackRoutes.router)


server.use('*', (err, req, res, next) => {
    res.status(400).send(err);
})

server.listen(port, () => {
    console.log("Server running on port: ", port)
})