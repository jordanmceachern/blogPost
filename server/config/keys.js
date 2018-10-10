if (process.env.NODE_ENV === 'production') { //heroku automatically sets this environment variable to 'production' in prod mode
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}