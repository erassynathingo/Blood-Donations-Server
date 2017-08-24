/**
 * @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
 * @module Logger_Library
 * @description Logs to the console && file logs
 * @param {String}
 * @returns log()
 * @throws 
 */

const config = require('../config')
let bunyan = require('bunyan')
let fs = require('fs')

let logPath = './logs/blood-donations.log'
let fatalLogPath = './logs/blood-donations_fatal_logs.log'
var logger = bunyan.createLogger(
  {
    name: 'alert_tool_logs',
    streams: [
      {
        level: 'info',
        stream: process.stdout, // log INFO and above to stdout
        name: 'logger'
      },
      {
        level: 'error',
        path: logPath, // log ERROR and above to a file
        type: 'rotating-file',
        period: '1d', // daily rotation
        count: 10, // keep 10 back copies
        name: 'Fatal_Errors'
      },
      {
        level: 'fatal',
        path: fatalLogPath, // log ERROR and above to a file
        type: 'rotating-file',
        period: '1d', // daily rotation
        count: 10, // keep 10 back copies
        name: 'Errors'
      }
    ]
  })

module.exports = function () {
  this.log = item => {
    if (config.env === 'Development') {
      console.info(item)
    }
    return this
  }
  this.trace = item => {
    logger.trace(item)
  }
  this.error = text => logger.error(text)

  this.debug = text => logger.debug(text)

  this.warn = text => logger.warn(text)

  this.info = text => logger.info(text)

  return this
}
