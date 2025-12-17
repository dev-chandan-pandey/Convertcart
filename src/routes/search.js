const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/dishes', async (req, res) => {
  const { name, minPrice, maxPrice } = req.query;

  if (!name || !minPrice || !maxPrice) {
    return res.status(400).json({
      error: 'name, minPrice, and maxPrice are required',
    });
  }

  try {
    const [rows] = await db.query(
      `
      SELECT
        r.id AS restaurantId,
        r.name AS restaurantName,
        r.city,
        m.name AS dishName,
        m.price AS dishPrice,
        COUNT(o.id) AS orderCount
      FROM restaurants r
      JOIN menu_items m ON r.id = m.restaurant_id
      LEFT JOIN orders o ON m.id = o.menu_item_id
      WHERE m.name LIKE ?
        AND m.price BETWEEN ? AND ?
      GROUP BY r.id, m.id
      ORDER BY orderCount DESC
      LIMIT 10
      `,
      [`%${name}%`, minPrice, maxPrice]
    );

    res.json({ restaurants: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
