/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module Alert_Server_API_Responser 
* @description 
* @param {responseObject, envelope, statusCode}
* @returns 
* @throws 
*/

const config = require('../config')
const Log = require('../libraries/logger.lib')
let logger = new Log()
module.exports = function(){

  this.send = (res, json, status) => {
    status = status === undefined ? 500: json.status || status

    logger.log("Status: ",status)
    switch (status) {
      case config.response.status_codes.FETCHED:
        logger.log('Fetch Success').log(json)
        res.status(200).json(json)
        break
      case config.response.status_codes.UPDATED:
        logger.log('Update success').log(json)
        res.status(200).json(json)
        break
      case config.response.status_codes.CREATED:
        logger.log('success').log(json)
        res.status(200).json(json)
        break
      case config.response.status_codes.BAD_REQUEST:
        logger.log('Bad Request')
        res.status(400).json(json)
        break
      case config.response.status_codes.UNAUTHORIZED:
        logger.log('Unauthorized')
        res.status(401).json(json)
        break
      case config.response.status_codes.CONFLICT:
        logger.log('Conflict')
        res.status(409).json(json)
        break
      case config.response.status_codes.FORBIDDEN:
        logger.log('Forbidden')
        res.status(403).json(json)
        break
      case config.response.status_codes.NOT_FOUND:
        logger.log('Resource Not Found')
        res.status(404).json(json)
        break
      case config.response.status_codes.DELETED:
        logger.log('Deleted')
        res.status(200).json(json)
        break
      case 415:
        logger.log('Unsupported Media Type')
        res.status(415).json(json)
        break
      case 431:
        logger.log('Request Header Fields Too Large')
        res.status(431).json(json)
        break
      case config.response.status_codes.NOT_CREATED:
        logger.log('Not created api feedback')
      default:
        logger.log('Default api feedback')
        res.status(500).json({
          status: 500,
          message: 'Server Error '+json
        })
    }
  }
}
