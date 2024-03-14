const express = require("express");
const morgan = require("morgan");

//express app
const app = express();

//Register view engine
app.set("view engine", "ejs");

//listen for request
app.listen(3000);

app.use((req, res, next) => {
  console.log("New Request Made");
  console.log("Host: ", req.hostname);
  console.log("Path: ", req.path);
  console.log("Method: ", req.method);
  next();
});

app.use((req, res, next) => {
  console.log("In the next middleware");
  next();
});

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  //res.send("<p>Home Page</p>");
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  //res.send("<p>About page</p>");
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  //res.send("<p>About page</p>");
  res.render("create", { title: "Create a New Blog" });
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
