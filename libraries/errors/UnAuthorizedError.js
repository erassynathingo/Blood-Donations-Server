function UnAuthorizedError(message) {
    this.name = 'UnAuthorizedError';
    this.message = message || 'You are not Authorised for the requested Action';
    this.stack = (new Error()).stack;
}
UnAuthorizedError.prototype = Object.create(Error.prototype);
UnAuthorizedError.prototype.constructor = UnAuthorizedError;

module.exports = UnAuthorizedError;