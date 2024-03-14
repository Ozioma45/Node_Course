const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  //console.log(req.url, req.method);

  //lodash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log("hello");
  });

  greet();
  greet();

  //set header content type
  res.setHeader("Content-Type", "text/html");

  //status code
  //100-informational response:An informational response indicates that the request was received and understood
  //200-success:This class of status codes indicates the action requested by the client was received, understood, and accepted
  //300-redirection: This class of status code indicates the client must take additional action to complete the request.
  //400 -client errors:This class of status code is intended for situations in which the error seems to have been caused by the client.

  //routing
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "./about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //res.write(data);

      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listen for request on Post 3000");
});
