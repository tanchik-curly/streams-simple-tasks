const LimitSizeStream = require("../modules/LimitSizeStream");
const LimitExceededError = require("../modules/LimitExceededError");
const expect = require("chai").expect;
const sinon = require("sinon");

describe("test-streams", () => {
  describe("LimitSizeStream", () => {
    it("stream doesn't change input data", (done) => {
      const limitStream = new LimitSizeStream({ limit: 5, encoding: "utf-8" });

      const onData = sinon.spy();

      limitStream.on("data", onData);
      limitStream.on("end", () => {
        expect(onData.calledTwice).to.be.true;
        expect(onData.firstCall.args[0].toString("UTF-8")).to.equal("Bla");
        expect(onData.secondCall.args[0].toString("UTF-8")).to.equal("_f");

        done();
      });

      limitStream.write("Bla");
      limitStream.write("_f");
      limitStream.end();
    });

    it("if we exceed limit, we'll throw exception", (done) => {
      const limitStream = new LimitSizeStream({ limit: 1 });

      const onData = sinon.spy();

      limitStream.on("data", onData);
      limitStream.on("error", (err) => {
        expect(err).to.be.instanceOf(LimitExceededError);
        expect(onData.calledOnce).to.be.true;
        done();
      });

      limitStream.write("a");
      limitStream.write("b");
    });
  });
});
