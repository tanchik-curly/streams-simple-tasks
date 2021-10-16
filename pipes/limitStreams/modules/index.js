const LimitSizeStream = require("./LimitSizeStream");
const fs = require("fs");

const readDataWithLimitBuff = () => {
  const limit = 5;

  const limitStream = new LimitSizeStream({ limit });
  limitStream.pipe(fs.createWriteStream("./out.txt"));

  limitStream.write("Bla");
  limitStream.write("_f");

  setTimeout(() => {
    limitStream.write("Bla-bla");
  }, 100);
};

readDataWithLimitBuff();
