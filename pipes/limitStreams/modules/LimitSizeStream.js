const stream = require("stream");
const LimitExceededError = require("./LimitExceededError");

class LimitSizeStream extends stream.Transform {
  constructor(args) {
    super(args);
    this.limit = args.limit;
    if (args.encoding !== null) {
      this.encoding = args.encoding;
    } else {
      this.encoding = "UTF-8";
    }
    this.dataCounter = 0;
  }

  _transform(chunk, encoding, callback) {
    try {
      const length = chunk.toString(this.encoding).length;

      if (length + this.dataCounter <= this.limit) {
        this.dataCounter += length;
        callback(null, chunk);
      } else {
        throw new LimitExceededError();
      }
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = LimitSizeStream;
