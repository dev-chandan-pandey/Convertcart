// const express = require('express');
// const searchRoutes = require('./routes/search');

// const app = express();
// app.use(express.json());

// app.use('/search', searchRoutes);

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });
require("dotenv").config();
const express = require("express");
const sql = require("./db");

const app = express();
app.use(express.json());

app.get("/search/dishes", async (req, res) => {
  const { name, minPrice, maxPrice } = req.query;

  if (!name || !minPrice || !maxPrice) {
    return res.status(400).json({
      error: "name, minPrice and maxPrice are required"
    });
  }

  try {
    const rows = await sql`
      SELECT
        r.id AS "restaurantId",
        r.name AS "restaurantName",
        r.city,
        m.name AS "dishName",
        m.price AS "dishPrice",
        COUNT(o.id) AS "orderCount"
      FROM restaurants r
      JOIN menu_items m ON r.id = m.restaurant_id
      LEFT JOIN orders o ON m.id = o.menu_item_id
      WHERE m.name ILIKE ${"%" + name + "%"}
        AND m.price BETWEEN ${minPrice} AND ${maxPrice}
      GROUP BY r.id, m.id
      ORDER BY "orderCount" DESC
      LIMIT 10
    `;

    res.json({ restaurants: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
