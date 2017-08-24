/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module Password_Hasher 
* @description 
* @param
* @returns 
* @throws 
*/

let Promise = require('bluebird')
let bcrypt = Promise.promisifyAll(require('bcrypt'))
const Log = require('../libraries/logger.lib');
let logger = new Log()

module.exports = function () {
  saltRounds = 10
  this.encrypt = plain => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(plain, saltRounds).then((hash) => {
        resolve(hash)
      }).catch((error) => {
        console.log('Hashing failed: ', error)
        reject(error)
      })
    })
  }

  this.compare = (plain, password) => bcrypt.compare(plain, password)
}
