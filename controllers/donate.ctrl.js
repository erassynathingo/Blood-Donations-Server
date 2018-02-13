/**
* @author Erastus Nathingo <contact@erassy.com>
* @module Alert_Controller
* @description Controller for Donations DB functions
* @params 
* @returns 
* @throws 
*/
let config = require('../config');
let mongoose = require('mongoose');
let Model = require('../models/donation.model');
let dict = require('../helpers/dictionary');
let mapper = require('../helpers/map');
const Log = require('../libraries/logger.lib');
const Permissions = require('../libraries/permissions.lib');
let logger = new Log();
let permissions = new Permissions();
const Mailer = require('../libraries/mailer.lib');
const mailer = new Mailer(config.nodemailerConfigs);
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

module.exports = {
  getOne: req => Model.findOne({ 'personalInfo.personalInfo.idNumber': req.params.id }),

  getAll: () => Model.find({}),

  delete: req => {
    if (permissions.delete(req) == true) {
      return Model.findOneAndRemove({ 'personalInfo.personalInfo.idNumber': req.params._id });
    }
  },

  create: req => {
    return Model.create(req.body);
  },
  update: req => {
    if (permissions.updateItems(req) == true) {
      return Model.findOneAndUpdate({ 'personalInfo.personalInfo.idNumber': req.params._id }, req.body);
    }
  },

  sendMail: options => {
    const source = fs.readFileSync(path.join(__dirname, '../templates/blood-request.hbs'), 'utf8');
    // Create email generator
    const template = Handlebars.compile(source);
    options.html = template(options.data);
    return mailer.sendMail(options);
  },

  getbyBloodType: blood_type =>{
    return Model.find({
      'personalInfo.personalInfo.blood_type': blood_type
    })
  }
};
