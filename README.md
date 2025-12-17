
```md
# Restaurant Dish Search API

A simple backend service to search restaurants by dish name, filtered by price range, and ranked by order popularity.

## Tech Stack
- Node.js
- Express
- PostgreSQL (Neon)
- Render (Deployment)

## Features
- Search restaurants by dish name
- Mandatory price range filter
- Top 10 restaurants ranked by order count
- Clean relational schema

## API Endpoint

### Search by Dish
GET /search/dishes

Query Params:
- name (string, required)
- minPrice (number, required)
- maxPrice (number, required)

Example:
```

/search/dishes?name=biryani&minPrice=150&maxPrice=300

````

Response:
```json
{
  "restaurants": [
    {
      "restaurantId": 1,
      "restaurantName": "Hyderabadi Spice House",
      "city": "Hyderabad",
      "dishName": "Chicken Biryani",
      "dishPrice": 220,
      "orderCount": 6
    }
  ]
}
````

## Database Design

* restaurants
* menu_items
* orders (1 order = 1 item)

## Setup Locally

```bash
npm install
node src/app.js
```

## Environment Variables

```
DATABASE_URL=postgresql://...
PORT=3000
```

## Live URL

[https://your-app.onrender.com](https://your-app.onrender.com)

```

---

