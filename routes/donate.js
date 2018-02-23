/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module Alerts_Route
* @description route to handles alerts requests
* @param
* @returns {Object} response object
* @throws {Not Found Error} route not found error
*/

const config = require('../config');
const Log = require('../libraries/logger.lib');
let express = require('express');
let bodyParser = require('body-parser');
let errorHandler = require('../libraries/errorHandler.lib');
let Auth = require('../middleware/auth.middleware');
let Response = require('../middleware/responder.middleware');
let controller = require('../controllers/donate.ctrl');
let response = new Response();
let logger = new Log();
let auth = new Auth();
let moduleName = "Item";
let router = express.Router();

let app = express()
app.use(bodyParser.urlencoded({
  extended: false
}))

router.put('/', (req, res, next) => {
  console.log("Application: ", req.body)
  controller.create(req).then(doc => {
    console.log("Returned: ", doc)
    logger.log(moduleName+' Creation successful').log(doc)
    res.status(200).json(doc)
  }).catch(error => {
    logger.log(moduleName+' Creating Error: ', error).error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_CREATED, moduleName+' could not be Created: ' + error.messsage)
    response.send(res, json)
  })
}).get('/', (req, res, next) => {
  controller.getAll(req).then(data => {
    logger.log(moduleName+' Fetch Successfull')
    res.status(200).json(data)
  }).catch(error => {
    logger.log(moduleName+' Fetch Error: ', error).error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_FETCHED, moduleName+' could not be Fetched: ' + error.messsage)
    response.send(res, json)
  })
}).get('/:id', (req, res, next) => {
  controller.getOne(req).then(data => {
    logger.log(moduleName+' Fetch Successfull')
    res.status(200).json(data)
  }).catch(error => {
    logger.log(moduleName+' Fetch Error: ', error).error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_FETCHED, moduleName+' could not be Fetched: ' + error.messsage)
    response.send(res, json)
  })
}).delete('/', auth.authenticate, (req, res, next) => {
  controller.delete(req).then(data => {
    logger.log("Item Deleted: ")
    res.status(200).json(data)
  }).catch(error => {
    logger.log(moduleName+' Delete Error: ', error).error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_DELETED, moduleName+' could not be Deleted: ' + error.messsage)
    response.send(res, json)
  })
}).patch('/', auth.authenticate, (req, res, next) => {
  controller.patch(req).then(data => {
    logger.log("Item Patched: ")
    res.status(200).json(data)
  }).catch(error => {
    logger.log(moduleName+' patch Error: ', error).error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_UPDATED, moduleName+' could not be Patched: ' + error.messsage)
    response.send(res, json)
  })
}).post('/mail', (req, res, next) => {
  controller.sendMail(req.body).then(data => {
    logger.log("Mail Sent: ").log(data);
    console.log("Mail Sent: ", data)
    res.status(200).json(data)
  }).catch(error => {
    logger.log(moduleName+' Mail Error: ', error).error(error)
    console.log("Mail Error: ", error);
    let json = errorHandler.resolve(error, error.status)
    response.send(res, json)
  })
})

module.exports = router
