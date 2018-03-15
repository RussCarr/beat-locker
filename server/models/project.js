var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = "Project"

var schema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled Project'
  },
  description: {
    type: String,
    required: true,
    default: 'New Beat-Locker project'
  },
  createdAt: {
    type: Number,
    // default: Date.now() // <-- Do this on front end. Otherwise you don't actually get the current time.
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trackIds: [String], // IDs of the Tracks that 'belong' to this Project
  barCount: {
    type: Number,
    required: true,
    default: 4
  },
  stepsPerBar: {
    type: Number,
    required: true,
    default: 4
  },
  bpmSetting: {
    type: Number,
    required: true,
    default: 120
  },
  privacySetting: {
    type: String,
    required: true,
    default: 'private'
  },
  forkCount: {
    type: Number,
    required: true,
    default: 0
  },
  playCount: {
    type: Number,
    required: true,
    default: 0
  },
  shareCount: {
    type: Number,
    required: true,
    default: 0
  },
  originalProjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  originalProjectCreatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model(schemaName, schema)