var router = require("express").Router();
var track = require("../models/track");

// Create a Track
router.post("/api/tracks", (req, res, next) => {
  if (req.session.uid) {
    // If there's a current session, get the userId from the logged-in user's session.
    req.body.userId = req.session.uid;
  } // (Otherwise, the userId must supplied in the req.body)
  track
    .create(req.body)
    .then(project => {
      res.send(project);
    })
    .catch(next);
});

// Get a Track by ID
router.get("/api/tracks/:trackId", (req, res, next) => {
  track
    .findById(req.params.trackId)
    .then(track => {
      res.send(track);
    })
    .catch(next);
});

// Update a Track by ID
router.put("/api/tracks/:trackId", (req, res, next) => {
  track
    .findByIdAndUpdate(req.params.trackId, req.body, { new: true })
    .then(track => {
      res.send({ message: "Successfully updated track", data: track });
    })
    .catch(next);
});

// Delete a Track by ID
router.delete("/api/tracks/:trackId", (req, res, next) => {
  track
    .findByIdAndRemove(req.params.trackId)
    .then(track => {
      res.send("Successfully deleted a track");
    })
    .catch(next);
});

// Get all Tracks
router.get("/api/tracks", (req, res, next) => {
  track
    .find()
    .then(track => {
      res.send(track);
    })
    .catch(next);
});

// Get track by projectId
router.get("/api/projects/:projectId/tracks", (req, res, next) => {
  track
    .find({ projectId: req.params.projectId })
    .then(track => {
      res.send(track);
    })
    .catch(next);
});

module.exports = { router };
