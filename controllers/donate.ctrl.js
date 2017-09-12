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
  getOne: req => Model.findOne({ idNumber: req.params.id }),

  getAll: () => Model.find({}),
  
  delete: (req) => {
    if (permissions.delete(req.session) == true) {
      return Model.findOneAndRemove({_id: req.params._id});
    }
  },

  create: req => {
    if (permissions.createItems(req.session) == true) {
      return Model.create(req);
    }
  },
  update: req =>{
    if(permissions.updateItems(req.session) == true){
      logger.Log(req.params._id + data + 'data')
      return Model.findOneAndUpdate({_id: req.params._id})
    }
  },
   patch: (req) => {
    return hash.encrypt(req.body.password).then(password => {
      return Model.findOneAndUpdate({
        _id: req.params._id
      }, {
        password: password
      });
    })
  }
};

