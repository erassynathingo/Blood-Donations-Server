/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module Database_config
* @description Provides Database Configuration for server
* @param {String} [config.db_url]
* @returns Mongoose connection
* @throws {MongoError} An error.
*/

let config = require('../config')
let Promise = require('bluebird')
let mongoose = require('mongoose')
mongoose.Promise = Promise

mongoose.connect(config.db_url,{useMongoClient: true})
let database = mongoose.connection
database.on('error', console.error.bind(console, 'MongoDB connection error:'))
.on('connected', () => {
    console.log(`Database connected`);
})
module.exports = mongoose
