/**
* @author Erastus Nathingo <contact@erassy.com>
* @module Alerts_Route
* @description route to handles alerts requests
* @param
* @returns {Object} response object
* @throws {Not Found Error} route not found error
*/

const config = require('../config');
const Log = require('../libraries/logger.lib');
let logger = new Log();
let express = require('express');
let errorHandler = require('../libraries/errorHandler.lib');
let Auth = require('../middleware/auth.middleware');
let auth = new Auth();
let Response = require('../middleware/responder.middleware');
let response = new Response();
let bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.xml(
	{
		type: 'application/xml'
	}
));

let router = express.Router();

router.post('/',(req, res)=>{
	auth.login(req).then((user) => {
		res.status(200).json(user);
	}).catch((error) => {
		logger.log('login threw an error: =>').log(error.message);
		let json = errorHandler.resolve(error, config.response.status_codes.UNAUTHORIZED);
		response.send(res, json);
	});
}).get('/', (req, res, next)=> {
	auth.getAuthenticated(req).then((user) => {
		res.status(200).json(user);
	}).catch((error) => {
		logger.log('Getting User').log(error.message);
		let json = errorHandler.resolve(error, config.response.status_codes.UNAUTHORIZED);
		response.send(res, json);
	});
}).patch('/', (req, res, next)=> {
	auth.update(req).then((user) => {
		logger.log('update successful.').log(user);
		res.status(200).json(user);
	}).catch((error) => {
		logger.log('Patch threw an error: =>').log(error.message);
		let json = errorHandler.resolve(error, config.response.status_codes.NOT_FOUND);
		response.send(res, json);
	});
}).delete('/', (req, res, next)=> {
	auth.logout(req).then(() => {
		logger.log('logged out successful');
		let json = { status: config.response.status_codes.DELETED, message: 'User log out successful' };
		res.status(200).json(json);
	}).catch((error) => {
		logger.log('logout threw an error: =>').log(error.message);
		let json = errorHandler.resolve(error, config.response.status_codes.SERVER_ERROR);
		response.send(res, json);
	});
});

module.exports = router;