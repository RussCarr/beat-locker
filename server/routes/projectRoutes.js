var router = require("express").Router();
var user = require("../models/user");
var project = require("../models/project");
var track = require("../models/track");

// // Create a Project
router.post("/api/projects", (req, res, next) => {
  // req.body.userId = req.session.uid; // Get the userId from the logged-in user's session
  if (req.session.uid) {
    // If there's a current session, get the userId from the logged-in user's session.
    req.body.userId = req.session.uid;
  } // (Otherwise, the userId must supplied in the req.body)
  project
    .create(req.body)
    .then(project => {
      res.send(project);
    })
    .catch(next);
});

// Get a Project by ID
router.get("/api/projects/:projectId", (req, res, next) => {
  project
    .findById(req.params.projectId)
    .then(project => {
      res.send(project);
    })
    .catch(next);
});

// Get Projects by UserId
router.get("/api/users/:userId/projects", (req, res, next) => {
  if (req.session.uid) {
    // If there's a current session, get the userId from the logged-in user's session.
    req.body.userId = req.session.uid;
  } // (Otherwise, the userId must supplied in the req.body)
  project
    .find({ userId: req.params.userId })
    .then(projects => {
      res.send(projects);
    })
    .catch(next);
});

// Update a Project by ID
router.put("/api/projects/:projectId", (req, res, next) => {
  console.log("here is the req", req);
  project
    .findByIdAndUpdate(req.params.projectId, req.body, { new: true })
    .then(project => {
      res.send({ message: "Successfully updated project", data: project });
    })
    .catch(next);
});

// Delete a Project
router.delete("/api/projects/:projectId", (req, res, next) => {
  project
    .findByIdAndRemove(req.params.projectId)
    .then(project => {
      res.send({ message: "Successfully deleted project" });
    })
    .catch(next);
  track
    .deleteMany({ projectId: req.params.projectId })
    .then(() => {
      console.log("Deleted project tracks");
    })
    .catch(next);
});

//Search project by title (full title or fragment)
router.get("/api/projects/search/title/:title", (req, res, next) => {
  project
    .find({ title: new RegExp("(" + req.params.title + ")", "i") }) // Use a regex to allow search-by-fragment
    .then(projects => {
      return res.send(projects);
    })
    .catch(next);
});

//Search project by description (full title or fragment)
router.get("/api/projects/search/description/:desc", (req, res, next) => {
  project
    .find({ description: new RegExp("(" + req.params.desc + ")", "i") }) // Use a regex to allow search-by-fragment
    .then(projects => {
      return res.send(projects);
    })
    .catch(next);
});

//Search project by owner's username (full username or fragment)
router.get("/api/projects/search/username/:username", (req, res, next) => {
  // First get the user(s) with the given username
  user
    .find({ name: new RegExp("(" + req.params.username + ")", "i") }) // Use a regex to allow search-by-fragment
    .then(users => {
      // Create an array of user ID(s) for found user(s)
      var userIds = users.map(user => user._id);

      // Use the user IDs array to get projects owned by the corresponding users
      project
        .find({ userId: { $in: userIds } }) // Note: $in is Mongo/Mongoose syntax allowing to do a query for userId in an array of userIds
        .then(projects => {
          res.send(projects);
        })
        .catch(next);
    })
    .catch(next);
});

// FOR TESTING ONLY: Get all projects
router.get("/api/projects", (req, res, next) => {
  project
    .find()
    .then(projects => {
      return res.send(projects);
    })
    .catch(next);
});

module.exports = { router };
