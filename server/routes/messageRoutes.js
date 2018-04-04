var router = require("express").Router();
var message = require("../models/message");

// Create a message
router.post("/api/messages", (req, res, next) => {
  message
    .create(req.body)
    .then(message => {
      res.send(message);
    })
    .catch(next);
});

// Get all messages
router.get("/api/messages", (req, res, next) => {
  message
    .find(req.query)
    .then(messages => {
      res.send(messages);
    })
    .catch(next);
});

module.exports = { router };
