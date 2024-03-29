const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// Express app
const app = express();

// Middleware and Static files
app.use(express.static("public"));
app.use(morgan("dev"));

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

// Register view engine
app.set("view engine", "ejs");

// Routes
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
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a New Blog" });
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
