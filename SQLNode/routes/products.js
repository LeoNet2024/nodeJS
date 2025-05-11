//routes/products.js

const router = require("./user");

router.get("/", (req, res, next) => {
  try {
    const { limit } = req.query;

    // Check the limit parameter
    if (limit && isNaN(limit)) {
      return res
        .status(400)
        .json({ error: 'Parameter "limit" must be a number' });
    }

    // Main logic
    const query = limit
      ? "SELECT * FROM products LIMIT ?"
      : "SELECT * FROM products";

    const params = limit ? [parseInt(limit, 10)] : [];

    db.query(query, params, (err, results) => {
      if (err) {
        // Pass the error to the error handler
        return next(err);
      }

      res.json(results);
    });
  } catch (error) {
    // Pass synchronous errors to the error handler
    next(error);
  }
});

module.exports = router;
