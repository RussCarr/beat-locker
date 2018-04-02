var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var schemaName = "Message";

var schema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model(schemaName, schema);
