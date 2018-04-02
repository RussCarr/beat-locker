var expressSession = require('express-session')
var mongoStore = require('connect-mongodb-session')(expressSession)

var connectionStr = process.env.DBCONNECTIONSTRING // url for the hosted mongo database

var store = new mongoStore({
  uri: connectionStr,
  collection: 'Sessions'
})

store.on('error', err => {
  console.log('[SESSION ERROR]', err)
})

var session = expressSession({
  secret: 'TobeorNot2be,thatisthe?williamShakephere',
  cookie: {
    maxAge: 1000*60*60*24*7*52
  },
  store: store,
  resave: true,
  saveUninitialized: true

})

module.exports = session