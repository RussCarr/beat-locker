var router = require("express").Router()
var projects = require("../models/project")


// createProject - by userId
router.post("/api/projects", (req, res, next) => {
    req.body.userId = req.session.uid // Get the userId from the logged-in user's session
    projects.create(req.body)
        .then(project => {
            res.send(project);
        })
        .catch(next)
})

// deleteproject
router.delete("/api/projects/:projectId", (req, res, next) => {
    projects.findOneAndRemove({ userId: req.session.uid, _id: req.params.projectId })
        .then(project => {
            if (!project) {
                res.status(401).send({ error: "Not authorized to remove project" })
            } else {
                res.send({ message: "Successfully deleted project" })
            }
        })
        .catch(next)
})

// updateproject
router.put("/api/projects/:projectId", (req, res, next) => {
    projects.findByIdAndUpdate(req.params.projectId, req.body, { new: true })
        .then(project => {
            res.send({ message: "Successfully updated project", data: project })
        })
        .catch(next)
})

// getprojectsByUserId
router.get("/myprojects", (req, res, next) => {
    var userId = req.session.uid // Get the userId from the logged-in user's session
    projects.find({ userId: userId })
        .then(projects => {
            return res.send(projects)
        })
        .catch(next)
})

// FOR TESTING ONLY: Get all projects
router.get("/api/projects", (req, res, next) => {
    projects.find()
        .then(projects => {
            return res.send(projects)
        })
        .catch(next)
})


module.exports = { router }