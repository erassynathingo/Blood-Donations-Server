/**
 * Authorization Handler
 * @module Authorizarion
 * @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
 * @description authorization handler
 * @type Module config|Module config
 * @param req
 * @returns {true | false}
 * @throws {new UnAuthorizedError()}
 */
let Promise = require('bluebird');
let UnAuthorizedError = require('../libraries/errors/UnAuthorizedError');
const Log = require('../libraries/logger.lib');
const logger = new Log();

class RBAC {
  constructor (roles) {
    this.roles = roles;
  }

  can (user, operation, params) {
    logger.trace(`Authorising ${operation} action for User: ${user._id}, Description: ${params}`);
    if (this.roles[user.role].can.indexOf(operation) !== -1) {
      return Promise.resolve(true);
    }else {
      return Promise.reject(new UnAuthorizedError(`${user.firstName} not authorised to create Users`));
    }
  }
}

module.exports = RBAC;
