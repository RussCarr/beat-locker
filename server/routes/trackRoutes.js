var router = require("express").Router();
var tracks = require("../models/track");

// Create a Track
router.post("/api/tracks", (req, res, next) => {
  if (req.session.uid) {
    // If there's a current session, get the userId from the logged-in user's session.
    req.body.userId = req.session.uid;
  } // (Otherwise, the userId must supplied in the req.body)
  tracks
    .create(req.body)
    .then(project => {
      res.send(project);
    })
    .catch(next);
});

// Get a Track by ID
router.get("/api/tracks/:tracksId", (req, res, next) => {
  tracks
    .findById(req.params.tracksId)
    .then(tracks => {
      res.send(tracks);
    })
    .catch(next);
});

// Update a Track by ID
router.put("/api/tracks/:tracksId", (req, res, next) => {
  tracks
    .findByIdAndUpdate(req.params.tracksId, req.body, { new: true })
    .then(tracks => {
      res.send({ message: "Successfully updated tracks", data: tracks });
    })
    .catch(next);
});

// Delete a Track by ID
router.delete("/api/tracks/:tracksId", (req, res, next) => {
  tracks
    .findByIdAndRemove(req.params.tracksId)
    .then(tracks => {
      res.send("Successfully deleted a tracks");
    })
    .catch(next);
});

// Get all Tracks
router.get("/api/tracks", (req, res, next) => {
  tracks
    .find()
    .then(trackss => {
      res.send(trackss);
    })
    .catch(next);
});

// Get trackss by projectId
router.get("/api/projects/:projectId/tracks", (req, res, next) => {
  tracks
    .find({ projectId: req.params.projectId })
    .then(trackss => {
      res.send(trackss);
    })
    .catch(next);
});

module.exports = { router };
