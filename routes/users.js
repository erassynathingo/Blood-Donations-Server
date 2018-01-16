/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @module Users_Route
* @description routes User requests from the client
* @param
* @returns {Object} response object
* @throws {Not Found Error} route not found error
*/

const config = require('../config');
const Log = require('../libraries/logger.lib');
let logger = new Log();
let express = require('express');
let bodyParser = require('body-parser');
let errorHandler = require('../libraries/errorHandler.lib');
let Auth = require('../middleware/auth.middleware');
let auth = new Auth();
let Response = require('../middleware/responder.middleware');
let controller = require('../controllers/user.ctrl');
let NotFoundError = require("../libraries/errors/NotFound");
let response = new Response();

let router = express.Router()
let app = express()
app.use(bodyParser.urlencoded({
  extended: false
}))

router.get('/:user_id/check', (req, res, next) => {
  controller.check(req).then((doc) => {
    logger.log('User retrieval successful').log(doc)
    let json = {
      status: config.response.status_codes.FETCHED,
      message: 'User Exists',
      user: doc
    }
    res.status(200).json(doc)
  }).catch((error) => {
    logger.log(' fetch resulted in an error').error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_CREATED, 'User retrieval unsuccessful')
    response.send(res, json)
  })
}).post('/:user_id', auth.authenticate, (req, res, next) => {
  controller.update(req).then((doc) => {
    logger.log(req.params.staff_id+'update successful').log(doc)
    if (doc !== null) {
      res.status(200).json(doc)
    } else {
      throw new Error('Cannot update user details.')
    }
  }).catch((error) => {
    logger.log(' update resulted in an error').error(error.message)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_UPDATED)
    response.send(res, json)
  })
}).put('/', (req, res, next) => {
  console.log("REG h: ", req.body);
  controller.create(req).then((doc) => {
    logger.log('Registration successful').log(doc)
    res.status(200).json(doc)
  }).catch((error) => {
    logger.log('Registration resulted in an error').error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_CREATED)
    response.send(res, json)
  })
}).patch('/:user_id', auth.authenticate, (req, res, next) => {
  controller.patch(req).then((doc) => {
    logger.log('Password change successful').log(doc)
    if (doc !== null) {
      res.status(200).json(doc)
    } else {
      throw new Error('Cannot update user password.')
    }
  }).catch((error) => {
    logger.log('Password update unsuccessful').error(error.message)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_UPDATED)
    response.send(res, json)
  })
}).delete('/:user_id', auth.authenticate, (req, res, next) => {
  logger.log('Deleting User: ').log(req.params.user_id);
  controller.delete(req).then((doc) => {
    logger.log('User Deletion successful').log(doc)
    if (doc !== null) {
      let json = {
      status: config.response.status_codes.DELETED,
      message: 'Deleted',
      user: doc
    }
    res.status(200).json(json)
    } else {
      throw new Error('User does not Exist')
    }
  }).catch((error) => {
    logger.log(' fetch resulted in an error').error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_DELETED)
    response.send(res, json)
  })
})
.get('/user_id', auth.authenticate, (req, res, next) => {
  controller.getOne(req).then((doc) => {
    logger.log(' retrieval successful').log(doc)
    if (doc !== null) {
      res.status(200).json(doc)
    } else {
      throw new Error('Cannot find user.')
    }
  }).catch((error) => {
    logger.log(' retrieval unsuccessful').error(error.message)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_FETCHED)
    response.send(res, json)
  })
}).get('/', auth.authenticate, (req, res, next) => {
  controller.get(req).then((doc) => {
    logger.log(' retrieval successful').log(doc)
    if (doc !== null) {
      res.status(200).json(doc)
    } else {
      throw new Error('Cannot find users.')
    }
  }).catch((error) => {
    logger.log(' retrieval unsuccessful').error(error.message)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_FETCHED)
    response.send(res, json)
  })
})

module.exports = router