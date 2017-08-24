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
let logger = new Log()
let express = require('express');
let router = express.Router();
let errorHandler = require('../libraries/errorHandler.lib');
let Auth = require('../middleware/auth.middleware');
let auth = new Auth();
let Response = require('../middleware/responder.middleware');
let response = new Response()
router.post('/', (req, res, next)=> {
	auth.login(req).then((user) => {
		response.send(res, user, config.response.status_codes.FETCHED);
	}).catch((error) => {
		logger.log('login threw an error: =>').log(error.message);
		let json = errorHandler.resolve(error, config.response.status_codes.UNAUTHORIZED, 'login unsuccessful');
		response.send(res, json);
	});
}).get('/', (req, res, next)=> {
	auth.getAuthenticated(req).then((user) => {
		logger.log('Current User').log(user);
		response.send(res, user, config.response.status_codes.FETCHED);
	}).catch((error) => {
		logger.log('Getting User').log(error.message);
		let json = errorHandler.resolve(error, config.response.status_codes.UNAUTHORIZED, 'login unsuccessful');
		response.send(res, json);
	});
}).patch('/', (req, res, next)=> {
	auth.update(req).then((user) => {
		logger.log('update successful.').log(user);
		response.send(res, user, config.response.status_codes.FETCHED);
	}).catch((error) => {
		logger.log('Patch threw an error: =>').log(error.message);
		let json = errorHandler.resolve(error, config.response.status_codes.NOT_FOUND, 'update unsuccessful');
		response.send(res, json);
	});
}).delete('/', (req, res, next)=> {
	auth.logout(req).then(() => {
		logger.log('logged out successful');
		let json = { status: config.response.status_codes.DELETED, message: 'User log out successful' };
		response.send(res, json);
	}).catch((error) => {
		logger.log('logout threw an error: =>').log(error.message);
		let json = errorHandler.resolve(error, config.response.status_codes.SERVER_ERROR, 'logout unsuccessful');
		response.send(res, json);
	});
});

module.exports = router;