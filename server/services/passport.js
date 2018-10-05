const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')
const users = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    users.findById(id).then(foundUser=>{
        done(null, foundUser)
    })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        user.findOne({ googleId: profile.id })
        .then(existingUser => {
            if (existingUser) {
                done(null, existingUser)
            } else {
                new user({ googleId: profile.id }).save()
                    ,then(newUser => done(null, newUser))
            }
        })
    })
)