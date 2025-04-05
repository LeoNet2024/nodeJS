const express = require("express");
const router = express.Router();

const products = require("../data");
const { productsExist, findIndexOfProduct } = require("../checking");

router.get("/", (req, res) => {
  res.send(products);
});

router.post("/", (req, res) => {
  const newProdcuts = req.body;

  const selected = productsExist(newProdcuts.id, products.products);

  console.log(selected);

  if (!selected) {
    products.products.push(newProdcuts);
    console.log("item has been added");
    res.end("item has been added");
  } else {
    res.send("the item exist");
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const selected = productsExist(id, products.products);

  if (!selected) res.status(404).send("page not found");

  res.send(selected);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  const selected = productsExist(id, products.products);

  if (!selected) res.status(404).send("cannot update the product");

  const index = findIndexOfProduct(id, products.products);

  console.log("hi");

  if (index) {
    products.products[index] = newData;
    res.send("the product has been updated");
  }

  if (!index) res.status(404).send("invalid index");
});

module.exports = router;
