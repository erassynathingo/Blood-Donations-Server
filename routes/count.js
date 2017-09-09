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
        logger.log('Error Saving TYpe').error(error)
        let json = errorHandler.resolve(error, config.response.status_codes.NOT_CREATED)
        response.send(res, json)
    })
})
.patch('/', (req, res) =>{
    controller.update(req).then(data=>{
        res.status(200).json(data)
    }).catch(error=>{
        logger.log('Update reulted in error').error(error)
        let json = errorHandler.resolve(error, config.response.status_codes.NOT_UPDATED)
        response.send(res, json)
    })
})

.get('/', (req, res)=>{
    controller.getMany().then(data=>{
        res.status(200).json(data);
    }).catch(error=>{
        logger.log('Fetch reulted in error').error(error)
        let json = errorHandler.resolve(error, config.response.status_codes.NOT_FETCHED)
        response.send(res, json)
    })
})

module.exports = router