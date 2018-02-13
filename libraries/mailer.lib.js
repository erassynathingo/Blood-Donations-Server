const express = require('express');
const mailer = require('express-mailer');
const Promise = require('bluebird');
const nodemailer = Promise.promisifyAll(require('nodemailer'))
const _config = require('../config');
let MailError = require('../libraries/errors/MailError');

const express_mailer = function (configs) {

  /**
   * @description Initialises the mailer configurations
   * @name initMailer
   * @returns {null}
   * @see https://www.npmjs.com/package/express-mailer
   */

  this.initMailer = () => {
      console.log("configs: ", configs)
    mailer.extend(express, configs);
    return this;
  };


  /**
   * @description Sends Email based on given options/ params
   * @name sendMail
   * @param {Object} options.to recepient of the email
   * @param {Object} options.body contains an html body template of the email
   * @param {Object} options.subject contains the subject of the email
   * @param {Object} options.other
   * @returns {Promise<Object>}  Either resolves or reject response sent from email host
   * @see https://www.npmjs.com/package/express-mailer
   */

  this.sendMail = (options) => {
    app.mailer.send(options.body, {
        to: options.to, // REQUIRED. This can be a comma delimited string just like a normal email to field.  
        subject: options.subject, // REQUIRED. 
        otherProperty: options.other // All additional properties are also passed to the template as local variables. 
      }, (err, response) => err ? Promise.reject(err) : Promise.resolve(response));
  }
};

const node_mailer = function(configs){

    this.transporter = ()=> nodemailer.createTransport(configs);

      /**
   * @description Sends Email based on given options/ params
   * @name sendMail
   * @param {Object} options.to recepient of the email
   * @param {Object} options.from sender of the email
   * @param {Object} options.html contains an html body template of the email
   * @param {Object} options.subject contains the subject of the email
   * @returns {Promise<Object>}  Either resolves or reject response sent from email host
   * @see https://www.npmjs.com/package/express-mailer
   */
  this.sendMail = (options) => this.transporter().sendMail(options).then(data=> data).catch(error=> new MailError(error.message));
};

module.exports = node_mailer;
