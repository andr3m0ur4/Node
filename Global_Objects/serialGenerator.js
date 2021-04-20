const config = require('./config')

module.exports.generate = () => Math.floor(Math.random() * config.max)