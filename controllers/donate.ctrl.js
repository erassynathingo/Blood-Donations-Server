/**
* @author Erastus Nathingo <contact@erassy.com>
* @module Alert_Controller
* @description Controller for Donations DB functions
* @params 
* @returns 
* @throws 
*/
let config = require("../config");
let mongoose = require("mongoose");
let Model = require("../models/donation.model");
let dict = require("../helpers/dictionary");
let mapper = require("../helpers/map");
const Log = require("../libraries/logger.lib");
const Permissions = require("../libraries/permissions.lib");
let logger = new Log();
let permissions = new Permissions();

module.exports = {
  getOne: req => Model.findOne({ "personalInfo.personalInfo.idNumber": req.params._id }),

  getAll: () => Model.find({}),

  delete: req => {
    if (permissions.delete(req) == true) {
      return Model.findOneAndRemove({ "personalInfo.personalInfo.idNumber": req.params._id });
    }
  },

  create: req => {
    if (permissions.createItems(req) == true) {
      return Model.create(req.body);
    }
  },
  update: req => {
    if (permissions.updateItems(req) == true) {
      return Model.findOneAndUpdate({ "personalInfo.personalInfo.idNumber": req.params._id }, req.body);
    }
  }
};
