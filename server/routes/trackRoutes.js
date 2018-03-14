var router = require('express').Router()
var track = require('../models/track')

// Create a Track
router.post('/api/tracks', (req, res, next) => {
    if (req.session.uid) { // If there's a current session...
      req.body.userId = req.session.uid // Get the userId from the logged-in user's session
    } // (Otherwise, the userId must supplied in the req.body)
    track.create(req.body)
        .then(project => {
            res.send(project);
        })
        .catch(next)
})

// Delete a Track
router.delete('/api/tracks/:trackId', (req, res, next) => {
  track.findByIdAndRemove(req.params.trackId)
    .then(track => {
      res.send('Successfully deleted a track')
    })
    .catch(next)
})

// Get all Tracks
router.get('/api/tracks', (req, res, next) => {
  track.find()
    .then(tracks => {
      res.send(tracks)
    })
    .catch(next)
})

module.exports = { router }