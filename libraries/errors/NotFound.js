function NotFoundError(message) {
    this.name = 'NotFoundError';
    this.message = message || 'Item Not Found';
    this.stack = (new Error()).stack;
}
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

module.exports = NotFoundError;