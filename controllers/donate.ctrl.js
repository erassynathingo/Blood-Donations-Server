/**
* @author Erastus Nathingo <contact@erassy.com>
* @module Alert_Controller
* @description Controller for Donations DB functions
* @params 
* @returns 
* @throws 
*/
let config = require('../config')
let mongoose = require('mongoose')
let Model = require('../models/alert.model')
let dict = require('../helpers/dictionary')
let mapper = require('../helpers/map')
const Log = require('../libraries/logger.lib')
const Permissions = require('../libraries/permissions.lib')
let logger = new Log()
let permissions = new Permissions()

module.exports = {
  getOne: (req) => {
    return Model.findOne({_id: req.params.id})
  },

  getAll: () => {
    return Model.find({})
  },

  create: (req) => {
    return mapper.map(req.body, dict.alert).then(data => {
      if (permissions.createItems(req.session, data.user_id) == true) {
        data.user_id = req.session.user.staff_id;
        return Model.create(data);
      }
    })
  }
}