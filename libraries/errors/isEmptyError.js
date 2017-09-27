function isEmptyError(message) {
    this.name = 'isEmptyError';
    this.message = message || 'Item must contain a value';
    this.stack = (new Error()).stack;
}
isEmptyError.prototype = Object.create(Error.prototype);
isEmptyError.prototype.constructor = isEmptyError;

module.exports = isEmptyError;