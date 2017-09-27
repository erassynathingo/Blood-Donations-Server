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
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  console.log("Origin: ", req.get('origin'));
  res.header('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE,PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, Content-Range, Content-Disposition, Content-Description')
  next()
}