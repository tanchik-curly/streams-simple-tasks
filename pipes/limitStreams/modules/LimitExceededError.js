class LimitExceededError extends Error {
  constructor() {
    super("Limit has been exceeded!");
    Error.captureStackTrace(this, this.constructor);
    this.code = "LIMIT_EXCEEDED";
  }
}

module.exports = LimitExceededError;
