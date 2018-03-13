var User = require('../models/user')
var Project = require('../models/project')
var router = require('express').Router()

// Get user info by email
router.get('/api/users/email/:userEmail', (req, res, next) => {
  User.findOne({ email: req.params.userEmail })
    .then(user => {
      var userInfo = {
        userId: user._id,
        name: user.name,
        email: user.email
      }
      return res.send(userInfo)
    })
    .catch(next)
})

// Get user info by Id
router.get('/api/users/:userId/info', (req, res, next) => {
   User.findById(req.params.userId)
    .then(user => {
      var userInfo = {
        userId: user._id,
        name: user.name,
        email: user.email
      }
      return res.send(userInfo)
    })
    .catch(next)
})


// TEMPORARY FOR TESTING!!! Get all Users
router.get('/api/users', getAllUsers)
function getAllUsers(req, res, next) {
  User.find(req.query)
    .then(users => {
      res.send(users)
    })
    .catch(next)
}

// TEMPORARY FOR TESTING!!! Delete a User
router.delete('/api/users/:userId', deleteUser)
function deleteUser(req, res, next) {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      return res.send({
        message: 'Sucessfully deleted a user'
      })
    })
    .catch(next)
}

module.exports = { router }