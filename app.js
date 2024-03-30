const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// Express app
const app = express();

// Connect to MongoDB
const dbURL =
  "mongodb+srv://Ozioma45:Oziblink2846@nodetut.dzkjohw.mongodb.net/nodeTut?retryWrites=true&w=majority&appName=NodeTut";

(async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();

// Middleware and Static files
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// Register view engine
app.set("view engine", "ejs");

// mongoose & mongo tests
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("5ea99b49b8531f40c0fde689")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a New Blog" });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
