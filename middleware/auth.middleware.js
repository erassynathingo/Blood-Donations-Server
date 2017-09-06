/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module Authentication_Middleware
* @description 
* @params 
* @returns 
* @throws 
*/

let express = require('express');
let config = require('../config')
let Promise = require('bluebird')
let _ = require('lodash')
const Log = require('../libraries/logger.lib')
let logger = new Log()
let Responder = require('../middleware/responder.middleware')
let responder = new Responder
let Model = require('../models/users.model')
let Hash = Promise.promisifyAll(require('../libraries/hash.lib'))
let UnAuthorizedError = require('../libraries/errors/UnAuthorizedError')
const dict = require('../helpers/dictionary')
let map = require('../helpers/map')
let hash = new Hash()
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json());

module.exports = function () {
  this.user = null
  /* middleware to check is a user is authenticated */
  this.authenticate = (req, res, next) => {
    (!req.session.authenticated && req.baseUrl !== '/auth') ?
      res.status(401).json({ status: 401, message: 'This action requires a logged in user' }) : next()
  }
  this.login = (req) => {
    console.log("User Request: ", req.body);
    return Model.findOne({ "username": req.body.username }).then((user) => {
      if (_.isEmpty(user)) {
        return Promise.reject(new UnAuthorizedError('Authentication failed, User does not exist'));
      }
      this.user = user
      /** compare passwords */
      return hash.compare(req.body.password, user.password)
    }).then(resp => {
      if (!resp) {
        return Promise.reject(new UnAuthorizedError('Authentication failed, Wrong password'));
      }
      return this.setSession(req)
    })
  }
  /* complete the authentication and send feedback */
  this.setSession = (req) => {
    req.session.authenticated = true
    return map.inverse(_.omit(this.user, ['password']), dict.user).then(data => {
      console.log("Inversed: ", data);
      req.session.user = data
      return Promise.resolve(req.session.user)
    }).catch(error => {
      return Promise.reject(error)
    })
  }
  /* check if user is authenticated */
  this.getAuthenticated = (req) => {
    return new Promise(function (resolve, reject) {
      if (req.session.authenticated) {
        resolve(req.session.user)
      } else {
        reject(new UnAuthorizedError('User is not logged in'))
      }
    })
  }
  /* logout a user and destry session */
  this.logout = (req) => {
    return new Promise((resolve, reject) => {
      req.session.destroy(function (err) {
        err ? reject(err) : resolve(true)
      })
    })
  }
  this.update = (req) => new Promise((resolve, reject) => {
    if (req.session && req.session.user && req.body.poc) {
      req.session.user.poc = _.clone(req.body.poc)
      resolve(req.session.user)
    } else {
      reject('Not Found')
    }
  })
}