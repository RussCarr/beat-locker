var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schemaName = "Track";

var schema = new Schema({
  instrumentName: { // Name of drum sample OR note (as pitch-octave, e.g. "C4")
    type: String,
    required: true,
    default: "snare-big"
  },
  isNote: Boolean, // True if this is a 'note' track, not a drum 'beat' track
  instrumentSamplePath: {
    type: String,
    default: "./../../assets/audio/snare-big.wav"
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
    type: [Boolean],
    required: true,
    default: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]
  },
  faderSetting: {
    type: Number,
    required: true,
    default: 5
  },
  createdAt: {
    type: Number
    // default: Date.now() // <-- Do this on front end. Otherwise you don't actually get the current time.
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  muted: {
    type: Boolean,
    default: false
  },
  solo: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model(schemaName, schema);
