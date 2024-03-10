const fs = require("fs");

//Reading file
/* fs.readFile("./doc/test.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});

console.log("last line"); */

//writing file
/* fs.writeFile("./doc/test.txt", "hello world", () => {
  console.log("file is written");
}); */

//Dierctories
/* if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("folder created");
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Folder Deleted");
  });
} */

//Deleted Files and created file
// File path where you want to create the file
const filePath = "deleteme.txt";

// Data to be written into the file
const fileContent = "This is the content of the file.";

if (fs.existsSync("./doc/deleteme.txt")) {
  fs.unlink("./doc/deleteme.txt", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file deleted");
  });
} else {
  fs.writeFile("./doc/deleteme.txt", fileContent, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("file created successfully");
  });
}
