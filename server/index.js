const express = require('express')
const app = express()
const cookieSession = require('cookie-session')
const passport = require('passport')

const mongoose = require('mongoose')
const keys = require('./config/keys')
mongoose.connect('keys.mongoURI')
require('./models/users')

require('./services/passport')
require('./routes/authRoutes')(app)

app.use(
    cookieSession({
        maxAge: 2592000000, //30 days
        key: [keys.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())

const PORT = process.env.PORT || 5000
app.listen(PORT)