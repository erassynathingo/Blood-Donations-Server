/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module User_Model
* @description Provides a mongoose model for Users
* @param
* @returns User
* @throws 
*/

let db = require("../libraries/db.js");
let ai = require("mongoose-auto-increment");
//ai.initialize(db.connection);
let Schema = db.Schema;
let moment = require("moment");
let users = require("../models/users.model");
let _config = require("../config");

let userSchema = new Schema(
  {
    _id: { type: Number, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    role: { type: String, required: true },
    entry_date: { type: Date, default: Date.now },
    entered_by: { type: String, ref: users },
    permissions: { type: Array, default: _config.defaultPermissions }
  }
);

module.exports = db.model("Users", userSchema);