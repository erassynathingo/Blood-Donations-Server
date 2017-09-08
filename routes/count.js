let Log = require("../libraries/logger.lib")

const config = require('../config');
let express = require('express');
let router = express.Router()
let logger = new Log();
let Response = require('../middleware/responder.middleware');
let errorHandler = require('../libraries/errorHandler.lib');
let response = new Response();
let bodyParser = require('body-parser');
let controller = require('../controllers/count.ctrl');
let app = express()
app.use(bodyParser.urlencoded({
  extended: false
}))

router.post('/', (req, res, next) => {
    logger.log('incoming: ', req.body)
    controller.create(req).then((success) => {
        res.status(200).json(success)
    }).catch(error => {
        logger.log('Error sending blood').error(error)
        let json = errorHandler.resolve(error, config.response.status_codes.NOT_CREATED)
        response.send(res, json)
    })
})

module.exports = router