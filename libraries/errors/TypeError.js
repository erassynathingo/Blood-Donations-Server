function TypeError(message) {
    this.name = 'ForbiddenError';
    this.message = message || 'Type does not Match';
    this.stack = (new Error()).stack;
}
TypeError.prototype = Object.create(Error.prototype);
TypeError.prototype.constructor = TypeError;

module.exports = TypeError;