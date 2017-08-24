/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @name Alert_Model
* @description Provides a mongoose model for alerts
* @param none
* @returns Alert_Model
* @throws 
*/

let db = require('../libraries/db.js')
let ai = require('mongoose-auto-increment')
ai.initialize(db.connection)
let Schema = db.Schema
let users = require('../models/users.model')
let donationSchema = new Schema({
  _id: {type: Number, unique: true, required: true},
  user_id: {type: Number, default: 000000, ref: users, required: true},
  entry_date: {type: Date, default: Date.now}
})
// Auto Increment _id Numbers of the Alerts
donationSchema.plugin(ai.plugin, 'Donations');
module.exports = db.model('Donations', donationSchema)
