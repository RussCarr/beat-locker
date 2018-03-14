var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = "Track"

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  instrument: {
    name: {
      type: String,
      required: true,
      default: 'snare-big'
    },
    samplePath: {
      type: String,
      required: true,
      default: './../../assets/audio/snare-big.wav'
    }
  },
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
  stepSequence: {
    type: Boolean,
    required: true,
    default: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,]
  },
  faderSetting: {
    type: Number,
    required: true,
    default: 50
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

module.exports = mongoose.model(schemaName, schema)