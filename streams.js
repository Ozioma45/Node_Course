const fs = require("fs");

const readStream = fs.createReadStream("./doc/blog.txt", { encoding: "utf-8" });
const writeStream = fs.createWriteStream("./doc/blog2.txt");

/* readStream.on("data", (chunk) => {
  console.log("-------NEW CHUNK-------");
  console.log(chunk);
  writeStream.write("\n NEW CHUNK \n");
  writeStream.write(chunk);
}); */

//Piping
readStream.pipe(writeStream);
