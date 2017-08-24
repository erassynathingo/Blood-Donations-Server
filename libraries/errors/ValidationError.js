function ValidationError(message) {
    this.name = 'ValidationError';
    this.message = message || 'You are not authenticated';
    this.stack = (new Error()).stack;
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

module.exports = ValidationError;