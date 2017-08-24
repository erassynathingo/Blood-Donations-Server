/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module Request_headers
* @description Defines request header contents
* @params 
* @returns 
* @throws 
*/

module.exports = function (req, res, next) {
  // Cross Origin headers//
  res.header('Access-Control-Allow-Origin', req.get('origin'))
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}
