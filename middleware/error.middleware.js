/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module Error_Middleware 
* @description Error Notification Library (for Development Mode Only)
* @params 
* @returns 
* @throws 
*/
let notifier = require('node-notifier')
const Log = require('../libraries/logger.lib');
let logger = new Log()

module.exports = {
  notification: (err, str, req) => {
    logger.log("Error: ", err).log("Error String: ", str)
    let title = 'Error in ' + req.method + ' ' + req.url
    notifier.notify({
      title: title,
      message: str
    })
  }
}
