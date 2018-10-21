const passport = require('passport')

module.exports = app => {
    //'google' is an internal identifier somewhere inside GoogleStrategy
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile','email']
        })
    )
    
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req,res) => {
            res.redirect('/')
        }
    )

    app.get('/api/current_user', (req,res) => {
        res.send(req.user) //user is extracted from cookie existing in session following a login
    })

    app.get('/api/logout', (req,res) => {
        req.logout() //function attached to the req obj by passport
        res.send(req.user)
    })
}