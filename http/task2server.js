const http = require("http");
const fs = require("fs");
const file = "./products.html";

http
  .createServer((req, res) => {
    res.setHeader("Content-type", "text/html");

    if (req.url === "/products") {
      fs.createReadStream(file)
        .pipe(res)
        .on("finish", () => {
          res.end();
        });
    } else {
      res.statusCode = 404;
      res.write("<h2>Opps...Not found</h2>");
      res.end();
    }
  })
  .listen(3000, () => {
    console.log("Server started at port 3000!");
  });
