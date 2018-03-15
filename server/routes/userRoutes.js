var user = require("../models/user");
var project = require("../models/project");
var track = require("../models/track");
var router = require("express").Router();

// Get user info by email
router.get("/api/users/email/:userEmail", (req, res, next) => {
  user.findOne({ email: req.params.userEmail })
    .then(user => {
      var userInfo = {
        userId: user._id,
        name: user.name,
        email: user.email
      };
      return res.send(userInfo);
    })
    .catch(next);
});

// Get user info by Id
router.get("/api/users/:userId/info", (req, res, next) => {
  user.findById(req.params.userId)
    .then(user => {
      var userInfo = {
        userId: user._id,
        name: user.name,
        email: user.email
      };
      return res.send(userInfo);
    })
    .catch(next);
});

// TEMPORARY FOR TESTING!!! Get all users
router.get("/api/users", getAllusers);
function getAllusers(req, res, next) {
  user.find(req.query)
    .then(users => {
      res.send(users);
    })
    .catch(next);
}

// TEMPORARY FOR TESTING!!! Delete a user
router.delete("/api/users/:userId", deleteuser);
function deleteuser(req, res, next) {
  user.findByIdAndRemove(req.params.userId)
    .then(user => {
      return res.send({
        message: "Sucessfully deleted a user"
      });
    })
    .catch(next);
  project.deleteMany({ userId: req.params.userId })
    .then(() => {
      console.log("Deleted user projects");
    })
    .catch(next);
  track.deleteMany({ userId: req.params.userId })
    .then(() => {
      console.log("Deleted user tracks");
    })
    .catch(next);
}

module.exports = { router };
