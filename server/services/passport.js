const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model('users')

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        User.findOne({ googleId: profile.id })
            .then(existingUser => {
                if (existingUser) {
                    done(null, existingUser)
                } else {
                    new User({ googleId: profile.id }).save()
                        .then(newUser => done(null, newUser))
                }
            })
        })
    )

passport.serializeUser((user, done) => {
    done(null, user.id) //"id" on this line is the mongo record id, not the google id
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(foundUser=>{
        done(null, foundUser)
    })
})