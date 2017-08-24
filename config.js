/**
* @author Erastus Nathingo <erastus.nathingo@standardbank.com.na>
* @description Contains the neccessary configuration for running the application
* @module Blood_Donations_Server_configuration_file
* @returns configs for @name
* @throws no Errors
*/

let session = require('express-session'),
MongoStore = require('connect-mongo')(session)

module.exports = {
  env: 'Development',
  port: 3030,
  db_url: 'mongodb://localhost:27017/Blood_Donations_Data',

  auth: {
    secret: 'S0ftwar3_3ng1n33ring_i5_7h3_B357',
    name: 'Blood_Donations_Tool',
    cookie: {
      sameSite: false
    },
    saveUninitialized: false,
    resave: true,
    store: new MongoStore({ url: 'mongodb://localhost:27017/Blood_Donations_Data' }),
    cookie: {
      expires: new Date(Date.now() + (3600000)),
      maxAge: 3600000
    },
    maxAge: 3600000

  },
  response: {
    status_codes: {
      'CREATED': 200,
      'FETCHED': 200,
      'DELETED': 200,
      'UPDATED': 200,
      'NOT_CREATED': 102,
      'NOT_FETCHED': 202,
      'NOT_DELETED': 302,
      'NOT_UPDATED': 402,
      'BAD_REQUEST': 500,
      'SERVER_ERROR': 600,
      'FORBIDDEN': 700,
      'UNAUTHORIZED': 401,
      'CONFLICT': 409,
      'NOT FOUND': 404
    },
    messages: {
      'created': 'Item(s) creation successful',
      'notCreated': 'Item(s) creation unsuccessful',
      'fetch': 'Item(s) retrieval successful',
      'notFetched': 'Item(s) retrieval unsuccessful',
      'updated': 'Items(s) update successful',
      'notUpdated': 'Item(s) update unsuccessful',
      'deleted': 'Item(s) deletion successful',
      'notDeleted': 'Item(s) deletion unsuccessful',
      'badRequest': 'Invalid request',
      'serverError': 'Requets could be completed due to server issues',
      'forbidden': 'You do not have the permission to perform this action',
      'unAuthorized': 'You are not authorized to perform this action'
    }
  },
  defaultPermissions: ["read", "write", "update"]
}
