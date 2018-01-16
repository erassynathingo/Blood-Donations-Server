/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @name Alert_Model
* @description Provides a mongoose model for Donations
* @param none
* @returns Donations Model Schema
* @throws 
*/

let db = require("../libraries/db.js");
let Schema = db.Schema;
let users = require("../models/users.model");

let donationSchema = new Schema({
  personalInfo: {
    title: { type: String, required: false },
    firstName: { type: String},
    lastName: { type: String},
    maidenName: { type: String, required: false },
    idNumber: { type: String, required: true},
    dateOfBirth: { type: String},
    gender: { type: String},
    language: { type: String},
    town: { type: String},
    populationGroup: { type: String},
    postalAddress: { type: String},
    homeAddress: { type: String},
    workAddress: { type: String},
    homeNumber: {
      number: { type: String, required: false },
      code: { type: String }
    },
    workNumber: {
      number: { type: String, required: false },
      code: { type: String }
    },
    cellNumber: {
      number: { type: String, required: false },
      code: { type: String }
    },
    email: { type: String},
    occupation: { type: String},
    familyDoctor: {
      firstName: { type: String, required: false },
      lastName: { type: String, required: false },
      contactNumber: {
        number: { type: String, required: false },
        code: { type: String }
      }
    },
    emergencyContact: {
      firstName: { type: String, required: false },
      lastName: { type: String, required: false },
      contactNumber: {
        number: { type: String, required: false },
        code: { type: String }
      }
    },
    lastDonationInNamibia: {
      location: { type: String},
      date: { type: String},
      previousAddress: { type: String},
      howManyDonationGiven: { type: Number, required: false }
    }
  },
  healthInfo: { type: Object},
  riskInfo: { type: Object}
});
module.exports = db.model("Donations", donationSchema);
