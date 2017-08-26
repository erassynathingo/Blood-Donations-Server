/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @name Alert_Model
* @description Provides a mongoose model for alerts
* @param none
* @returns Alert_Model
* @throws 
*/

let db = require('../libraries/db.js')
let Schema = db.Schema
let users = require('../models/users.model')
let donationSchema = new Schema({
  _id: {type: Number, unique: true, required: true},
  user_id: {type: Number, default: 000000, ref: users, required: true},
  entry_date: {type: Date, default: Date.now}
})
module.exports = db.model('Donations', donationSchema)
