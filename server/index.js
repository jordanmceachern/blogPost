const express = require('express')
const app = express()
const cookieSession = require('cookie-session')
const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('./config/keys')

app.use(passport.initialize())
app.use(passport.session())
mongoose.connect(keys.mongoURI)
require('./models/users')

require('./services/passport')
require('./routes/authRoutes')(app)

app.use(
    cookieSession({
        name: 'session',
        keys: [keys.cookieKey],
        maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
    })
)

const PORT = process.env.PORT || 5000
app.listen(PORT)