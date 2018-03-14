var router = require("express").Router()
var project = require("../models/project")

// Create a Project
router.post("/api/projects", (req, res, next) => {
    req.body.userId = req.session.uid // Get the userId from the logged-in user's session
    project.create(req.body)
        .then(project => {
            res.send(project);
        })
        .catch(next)
})

// Update a Project
router.put("/api/projects/:projectId", (req, res, next) => {
    project.findByIdAndUpdate(req.params.projectId, req.body, { new: true })
        .then(project => {
            res.send({ message: "Successfully updated project", data: project })
        })
        .catch(next)
})

// Delete a Project
router.delete("/api/projects/:projectId", (req, res, next) => {
    project.findByIdAndRemove(req.params.projectId)
        .then(project => {
            res.send({ message: "Successfully deleted project" })
        })
        .catch(next)
})

// Delete a Project
// router.delete("/api/projects/:projectId", (req, res, next) => {
//     project.findOneAndRemove({ userId: req.session.uid, _id: req.params.projectId })
//         .then(project => {
//             if (!project) {
//                 res.status(401).send({ error: "Not authorized to remove project" })
//             } else {
//                 res.send({ message: "Successfully deleted project" })
//             }
//         })
//         .catch(next)
// })

// FOR TESTING ONLY: Get all projects
router.get("/api/projects", (req, res, next) => {
    project.find()
        .then(projects => {
            return res.send(projects)
        })
        .catch(next)
})


module.exports = { router }