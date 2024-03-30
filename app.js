const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRouter");

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

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
