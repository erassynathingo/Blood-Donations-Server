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
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    maidenName: { type: String, required: false },
    idNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    language: { type: String, required: true },
    town: { type: String, required: true },
    populationGroup: { type: String, required: true },
    postalAddress: { type: String, required: true },
    homeAddress: { type: String, required: true },
    workAddress: { type: String, required: true },
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
    email: { type: String, required: true },
    occupation: { type: String, required: true },
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
      location: { type: String, required: true },
      date: { type: String, required: true },
      previousAddress: { type: String, required: true },
      howManyDonationGiven: { type: Number, required: false }
    }
  },
  healthInfo: {
    feelingWellandInGooHealth: { type: String, required: true },
    eatenInLastFourHours: { type: String, required: true },
    everBeenRefusedAsBloodDonor: { type: String, required: true },
    involdedInLifeEndageringActivity: {
      drivingPublicTransport: { type: String, required: true },
      pilotingAircraft: { type: String, required: true }
    },
    duringLastSevenDays: {
      takenMedication: { type: String, required: true },
      beenToTheDentist: { type: String, required: true }
    },
    inPastSixMonths: {
      hadVaccination: { type: String, required: true },
      exposedToInductrialChemicals: { type: String, required: true },
      receivedTreatment: { type: String, required: true },
      undergoneSurgery: { type: String, required: true },
      exposedToBlood: { type: String, required: true },
      hadPiercing: { type: String, required: true }
    },
    operationInNextTwoMonths: { type: String, required: true },
    participatedInDrugTrial: { type: String, required: true },
    takenTigasonOrNeotigason: { type: String, required: true },

    femaleDonors: {
      breastFeeding: { type: String, required: true },
      pregnant: { type: String, required: true }
    },
    hadHepatitisBefore: { type: String, required: true },
    givenHepatitisBinlast6Months: { type: String, required: true },
    hadMalariaInPast36Months: { type: String, required: true },
    visitedMalariaAreainPast3Weeks: { type: String, required: true },

    hadHeartDiseaseBefore: { type: String, required: true },
    hadLungDiseaseBefore: { type: String, required: true },
    hadBloodDiseaseBefore: { type: String, required: true },
    hadThyroidDiseaseBefore: { type: String, required: true },
    hadSkinDiseaseBefore: { type: String, required: true },
    hadChagasDiseaseBefore: { type: String, required: true },
    hadChronicMedicalConditionBefore: { type: String, required: true },

    CJD: {
      hadTissueTransplantBefore: { type: String, required: true },
      hadFertilityMedicineBefore: { type: String, required: true },
      hadRelativeWithCJD: { type: String, required: true },
      timeInUK12months: { type: String, required: true }
    },
    youOrSexualPartner: {
      sufferedFromDiarrhoeaPast12Months: { type: String, required: true },
      receivedBloodTransInLast6Months: { type: String, required: true }
    }
  },
  riskInfo: {
    HIVorARVSwithPartner: { type: String, required: true },
    donateReasonForHIVTest: { type: String, required: true },
    inPast6Months: {
      uncertainSexualActivity: { type: String, required: true },
      sexualAssaultVictim: { type: String, required: true },
      sexWithProstitute: { type: String, required: true }
    },
    sufferedFromSTI12months: { type: String, required: true },
    injectedWithDrugs: { type: String, required: true },
    uncertainOfPartnerSexualPast: { type: String, required: true },
    bloodSafeForTransfusion: { type: String, required: true }
  }
});
module.exports = db.model("Donations", donationSchema);
