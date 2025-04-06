const express = require('express');
const dbSingleton = require('../db.singleton');
const router = express.Router();

const db = dbSingleton.getConnection();

router.get('/', (req, res) => {
  const query = `SELECT * FROM products`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { id, name, price } = req.body;
  const query = `INSERT INTO products (id, name, price) VALUES (?,?,?)`;
  db.query(query, [id, name, price], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: 'user added!', id: results.insertId });
  });
});
