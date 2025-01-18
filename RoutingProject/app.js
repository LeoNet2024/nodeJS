const fs = require("fs");
const http = require("http");
const url = require("url");

//Reading all files before the server created
const page = fs.readFileSync("./templates/page.html");
const about = fs.readFileSync("./templates/about.html");
const contact = fs.readFileSync("./templates/contact.html");
const style = fs.readFileSync("./templates/style.css");
// pageNotFound include unsmile picture and text: page not found
const pageNotFound = `<div>
    <h1>Page not found</h1>
    <img
      src="https://static.thenounproject.com/png/342291-200.png"
      alt=""
    />
  </div>`;

// create server
const server = http.createServer((req, res) => {
  const parseUrl = url.parse(req.url, true);
  const pathName = parseUrl.pathname;

  if (pathName === "/") {
    res.writeHead(200, "Content-Type", "text/html");
    res.end(page);
    console.log("page main");
  } else if (pathName === "/about.html") {
    res.writeHead(200, "Content-Type", "text/html");
    console.log("About Page");
    res.end(about);
  } else if (pathName === "/contact.html") {
    res.writeHead(200, "Content-Type", "text/html");
    console.log("contact Page");
    res.end(contact);
  } else if (pathName === "/style.css") {
    res.writeHead(200, "Content-Type", "text/css");
    console.log("style.css Page");
    res.end(style);
  } else {
    res.writeHead(404, "Content-Type", "text/html");
    res.end(pageNotFound);
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("listen to port", PORT);
});
