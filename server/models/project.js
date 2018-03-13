var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = "Project"

var schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now()
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
})

module.exports = mongoose.model(schemaName, schema)