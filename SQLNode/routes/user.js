const express = require("express");
const dbSingleton = require("../db.singleton");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = dbSingleton.getConnection();

// get users table
router.get("/", (req, res) => {
  const query = `SELECT * FROM users`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    console.log(results);
    res.json(results);
  });
});

// Adding users into table users
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  const userEmailQuery = `select * from users where users.email = (?)`;

  db.query(userEmailQuery, [email], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length > 0) {
      res.status(500).send("Email already used");
    }
  });

  bcrypt.hash(password, 10, (err, hashedPass) => {
    if (err) {
      res.status(500).send(err);
    }

    const query = `INSERT INTO users (name,email,password) VALUES (?,?,?)`;
    db.query(query, [name, email, hashedPass], (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ message: "user added!", id: results.insertId });
    });
  });
});

// update password router

router.put("/", (req, res) => {
  const { email, password } = req.body;

  const userEmailQuery = `select * from users where users.email = (?)`;

  db.query(userEmailQuery, [email], (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    // user found
    else if (results.length > 0) {
      bcrypt.hash(password, 10, (err, hashedPass) => {
        if (err) throw err;

        const query = `update users set users.password = (?) where users.email = (?)`;

        db.query(query, [hashedPass, email], (err, results) => {
          if (err) res.status(500).send(err);
        });
        res.send("password changed successfully");
      });
    }
  });
});

//login router
router.post("/login", (req, res) => {
  const { password, email } = req.body;

  const query = `select email, password from users where email = (?)`;

  db.query(query, [email], (err, foundUser) => {
    if (err) throw err;
    // user found
    else if (foundUser.length > 0) {
      bcrypt.compare(password, foundUser[0].password, (err, match) => {
        if (err) {
          res.status(500).send(err);
        } else if (match) {
          console.log("Login succssefully");
        } else {
          console.log("incorrect password");
        }
      });
    }
  });
});

module.exports = router;
