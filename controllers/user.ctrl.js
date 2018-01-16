/**
 * @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
 * @module User_Controller
 * @description 
 * @params 
 * @returns 
 * @throws 
 */

let config = require('../config');
let _ = require('lodash');
let Model = require('../models/users.model')
const mapper = require('../helpers/map');
const dict = require('../helpers/dictionary');
let Hash = require('../libraries/hash.lib');
let hash = new Hash();
const Log = require('../libraries/logger.lib');
let logger = new Log()

module.exports = {
  create: (req) => {
    return hash.encrypt(req.body.password).then(password => {
      data = req.body;
      data.password = password;
      return mapper.map(data, dict.user).then(doc => {
        return Model.create(doc)
      })
    })
  },
  update: (req) => {
    return mapper.map(_.omit(req.body, ['password']), dict.user).then(data => {
      logger.log('Session User: ', req.session.user);
      return Model.findOneAndUpdate({
        _id: req.params.user_id
      }, data)
    })
  },
  check: (req) => {
    return Model.findOne({
      _id: req.params.user_id
    })
  },
  patch: (req) => {
    return hash.encrypt(req.body.password).then(password => {
      return Model.findOneAndUpdate({
        _id: req.params.user_id
      }, {
        password: password
      });
    })
  },

  delete: (req)=>{
    console.log("Removing: ", req.params)
    return Model.findOneAndRemove({_id: req.params.user_id});
  },

  getOne: (req) => {
    return Model.findOne({
      _id: req.params.user_id
    })
  },
  get: (req) => {
    return Model.find({})
  }
}