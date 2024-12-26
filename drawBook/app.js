const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const fileTosend = fs.readFileSync("./template/main.html");
  res.setHeader("Content-Type", "text/html");
  res.end(fileTosend);
  
});

const PORT = 5000;

server.listen(PORT);
console.log("listen to port");
