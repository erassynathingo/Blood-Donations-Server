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
let router = express.Router();
let errorHandler = require('../libraries/errorHandler.lib');
let Auth = require('../middleware/auth.middleware');
let Response = require('../middleware/responder.middleware');
let controller = require('../controllers/donate.ctrl');
let response = new Response();
let logger = new Log();
let auth = new Auth();
let moduleName = "Item";

router.put('/', (res, req, next) => {
  controller.create(req).then(doc => {
    logger.log(moduleName+' Creation successful').log(doc)
    res.status(200).json(doc)
  }).catch(error => {
    logger.log(moduleName+' Creating Error: ', error).error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_CREATED, moduleName+' could not be Created: ' + error.messsage)
    response.send(res, json)
  })
}).get('/', auth.authenticate, (req, res, next) => {
  controller.getAll(req).then(data => {
    logger.log(moduleName+' Fetch Successfull').log(data)
    res.status(200).json(data)
  }).catch(error => {
    logger.log(moduleName+' Fetch Error: ', error).error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_FETCHED, moduleName+' could not be Fetched: ' + error.messsage)
    response.send(res, json)
  })
}).get('/:id', auth.authenticate, (req, res, next) => {
  controller.getOne(req).then(data => {
    logger.log(moduleName+' Fetch Successfull').log(data)
    res.status(200).json(data)
  }).catch(error => {
    logger.log(moduleName+' Fetch Error: ', error).error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_FETCHED, moduleName+' could not be Fetched: ' + error.messsage)
    response.send(res, json)
  })
}).delete('/', auth.authenticate, (req, res, next) => {
  controller.delete(req).then(data => {
    logger.log("Item Deleted: ").log(data)
    res.status(200).json(data)
  }).catch(error => {
    logger.log(moduleName+' Delete Error: ', error).error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_DELETED, moduleName+' could not be Deleted: ' + error.messsage)
    response.send(res, json)
  })
}).patch('/', auth.authenticate, (req, res, next) => {
  controller.patch(req).then(data => {
    logger.log("Item Patched: ").log(data)
    res.status(200).json(data)
  }).catch(error => {
    logger.log(moduleName+' patch Error: ', error).error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_UPDATED, moduleName+' could not be Patched: ' + error.messsage)
    response.send(res, json)
  })
})

module.exports = router
