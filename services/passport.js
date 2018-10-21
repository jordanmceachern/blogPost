const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')
const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id) //"id" on this line is the mongo record id, not the google id
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(foundUser=>{
        done(null, foundUser)
    })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        try{const existingUser = await User.findOne({ googleId: profile.id })
            console.log(existingUser)
            if (existingUser) {
                done(null, existingUser)
            } else {
                const newUser = await new User({ googleId: profile.id, name: profile.displayName }).save()
                done(null, newUser)
            }} catch(err) {return console.log(err)}
        }
    )
)