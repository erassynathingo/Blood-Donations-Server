function ForbiddenError(message) {
    this.name = 'ForbiddenError';
    this.message = message || 'You do not have permission to perform the requested action';
    this.stack = (new Error()).stack;
}
ForbiddenError.prototype = Object.create(Error.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;

module.exports = ForbiddenError;