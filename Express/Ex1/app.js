const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const logger = require("./assets/logger");
const products = require("./products.json");
const users = require("./users.json");

app.use(logger);

//יודע להשתמש ולטעון קבצים קבועים שמיקמנו בתיקייה מסוימית.
//מכילה קבצים קבועים שלא משתנים
//במקום קוד ארוך - נותנים לאקספרס לטפל בקבצים קבועים

app.use(express.static(path.join(__dirname, "assets")));

app.get("/products", function (req, res) {
  res.send(products);
});

app.get("/products/:id", function (req, res) {
  const id = req.params.id;
  const product = products[id];
  if (product) res.send(product);
  else res.status(404).send("Product not found");
});

app.get("/users", function (req, res) {
  const age = req.query.age;
  if (!age) {
    res.send(users);
  } else {
    const userFound = users.filter((el) => {
      if (el.age <= age) return el;
    });
    console.log(userFound);
    res.send(userFound);
  }
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
