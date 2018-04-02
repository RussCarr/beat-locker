// Details for database hosted on mLab
var connectionStr = process.env.DBCONNECTIONSTRING // url for the hosted mongo database

// Mongoose connection setup. (Mongoose = driver/ORM for mongo db)
var mongoose = require('mongoose')
var connection = mongoose.connection
mongoose.connect(connectionStr)

// If the db connection fires an error event, send a message to the console
connection.on('error', err => {
  console.log('mLab error', err)
})

// When the db connection is first initiated, send a message to the console
connection.on('open', () => {
  console.log('mLab is up!')
})
