const express = require('express');
const dbSingleton = require('../db.singleton');
const router = express.Router();

const db = dbSingleton.getConnection();

router.get('/', (req, res) => {
  const query = `SELECT * FROM users`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  const query = `INSERT INTO users (name,email,password) VALUES (?,?,?)`;
  db.query(query, [name, email, password], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: 'user added!', id: results.insertId });
  });
});

module.exports = router;
