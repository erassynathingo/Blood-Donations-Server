/**
 * @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
 * @module Permissions_Handler
 * @description Handlers User Access Rights
 * @param
 * @returns true if access granted
 * @throws {new ForbiddenError} You do not Have Permission
 */

let config = require('../config')
let Promise = require('bluebird')
let _ = require('lodash')
let Log = require('../libraries/logger.lib')
let ForbiddenError = require('../libraries/errors/ForbiddenError')
let logger = new Log()

module.exports = function () {
  /* check if a user has permission to perform a particular action a resource */
  this.checkPermission = (item, action, session) => {
    console.log("Session: ", session.user)
      if ((session.user.permissions[0]=== item) || (session.user.permissions.find(action) === action)) {
        return true
      } else {
        return new ForbiddenError('You do not have permissions to ' + action + ' items')
      }
  },

  this.createItems = (req) => {
    return this.checkPermission('management', 'create', req);
  }

  this.deleteItems = (req) => this.checkPermission('management', 'remove', req)

  this.updateItems = (req) => this.checkPermission('management', 'update', req)

  this.createUniversal = (req) => this.checkPermission('management', 'add', req)

  this.updateUniversal = (req) => this.checkPermission('management', 'update', req)
}