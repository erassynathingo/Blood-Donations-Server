function MailError(message) {
    this.name = 'MailError';
    this.message = message || 'Email Error';
    this.stack = (new Error()).stack;
    this.status = 400;
}
MailError.prototype = Object.create(Error.prototype);
MailError.prototype.constructor = MailError;

module.exports = MailError;