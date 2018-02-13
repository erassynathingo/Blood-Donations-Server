/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module ErrorHandler 
* @description Module for handling Errors
* @param {Error}
* @returns {Object} error response to Client
*/

let config = require('../config')
let _ = require('lodash')
const Log = require('../libraries/logger.lib');
let logger = new Log()

module.exports = {
  resolve: (error, status) => {
    console.info('Resolving Error!!')
    let response = {}

    logger.log('Caused By: ', error.name + '\nMessage: ' + error.message)
    switch (error.name) {
      case 'ValidationError':
        response.status = 400
        response.message = (!_.isUndefined(error.message) && !_.isEmpty(error.message)) ? error.message : 'Due to validation'
        break;
      case 'ForbiddenError':
        response.status = 403
        response.message = (!_.isUndefined(error.message) && !_.isEmpty(error.message)) ? error.message : 'You do not have permission'
        break;
      case 'UnAuthorizedError':
        response.status = (!_.isUndefined(error.status) && !_.isEmpty(error.status)) ? error.status : 401
        response.message = (!_.isUndefined(error.message) && !_.isEmpty(error.message)) ? error.message : 'You are not authorized'
        break;
        case 'MailError':
          response.status = 400
          response.message = (!_.isUndefined(error.message) && !_.isEmpty(error.message)) ? error.message : 'Email Error'
          break;
      case 'TypeError':
        response.status = (!_.isUndefined(error.status) && !_.isEmpty(error.status)) ? error.status : status 
        response.message = (!_.isUndefined(error.message) && !_.isEmpty(error.message)) ? error.message : 'Validation Type Error'
        break;
      case 'isEmptyError':
        response.status = (!_.isUndefined(error.status) && !_.isEmpty(error.status)) ? error.status : 411
        response.message = (!_.isUndefined(error.message) && !_.isEmpty(error.message)) ? error.message : 'Item is Empty'
        break;
      case 'NotFoundError':
        response.status = 404;
        response.message = (!_.isUndefined(error.message) && !_.isEmpty(error.message)) ? error.message : 'Item not Found';
        break;
      default:
        response.status = (!_.isUndefined(error.message) && !_.isEmpty(error.message)) ? status : 500;
        response.message = (!_.isUndefined(error.message) && !_.isEmpty(error.message)) ? error.message : 'Server Error';
        break;
    }
    console.log('Error Handler: ', response)
    logger.error(response);
    return response;
  }
}