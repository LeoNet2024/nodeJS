const express = require("express");
const dbSingleton = require("../db.singleton");
const e = require("express");
const router = express.Router();

const db = dbSingleton.getConnection();

// adding new article
router.post("/", (req, res) => {
  const query = `insert into articles(title,content,author) values(?,?,?)`;

  const values = [req.body.title, req.body.content, req.body.author];

  db.query(query, values, (err, result) => {
    if (err) console.error(err);
    else console.log(result);
  });
});

// get all the articles
router.get("/", (req, res) => {
  const query = `select * from articles`;

  db.query(query, (err, result) => {
    if (err) {
      console.error(er);
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

router.get("/id/:id", (req, res) => {
  const id = req.params.id;

  console.log(id);

  const query = `select * from articles where id = ${id}`;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM articles WHERE id = ${id};`;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("article has removed");
    }
  });
});

router.get("/author", (req, res) => {
  const { name } = req.query;

  console.log("hello");

  const query = `select * from articles where author = '${name}'`;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

router.get("/date", (req, res) => {
  console.log("hello");

  const { date } = req.query;

  const query = `SELECT * FROM articles WHERE created_at > ${date};`;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

// sorted by date
router.get("/sorted", (req, res) => {
  console.log("hello");

  const query = `SELECT * FROM articles ORDER BY created_at DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

module.exports = router;
