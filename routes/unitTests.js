let express = require('express')
let router = express.Router()
const config = require('../config')
const Log = require('../libraries/logger.lib')
let errorHandler = require('../libraries/errorHandler.lib')
let Auth = require('../middleware/auth.middleware')
let Response = require('../middleware/responder.middleware')
let controller = require('../controllers/donate.ctrl')
let response = new Response()
let logger = new Log()
let auth = new Auth()

router.post('/loggers', (req, res, next) => {
  let item = req.body
  logger.log('Getting Tests').log(item)
  auth.authenticate(req, res, next).then(data => {
    logger.log('Auth Data: ', data)
    res.status(200).json({message: item})
  })

/*controller.create(req).then(doc => {
  logger.log('Registration successful').log(doc)
  response.send(res, doc)
}).catch(error => {
  logger.log('Alert Creating Error: ', error).error(error)
  let json = errorHandler.resolve(error, config.response.status_codes.NOT_CREATED, 'Alert could not be Created: ' + error.messsage)
  response.send(res, json)
})*/
})

router.post('/haha', auth.authenticate,(req, res, next) => {
  logger.log('REQ: ', req.body)
  controller.create(req).then(doc => {
    logger.log('Registration successful').log(doc)
    response.send(res, doc)
  }).catch(error => {
    logger.log('Alert Creating Error: ', error).error(error)
    let json = errorHandler.resolve(error, config.response.status_codes.NOT_CREATED, 'Alert could not be Created: ' + error.messsage)
    response.send(res, json)
  })
})
module.exports = router
